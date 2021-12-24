import { randomUUID, scryptSync } from 'crypto';
import { sign, verify } from 'jsonwebtoken';

import { jwtConfig } from '../../environment/environment';
import { cacheRetrieve, cacheStore, cacheDelete } from '../../services/cache/cache-service';

export const jwtRefresh = async (req, res, next) => {
    try {
        const oldSend = res.send;
        let jwtPayload;
        let cacheKey;

        const [, jwt] = (req.header('Authorization') || '').split(/\s/);
        if (jwt) {
            const [, encodedPayload] = jwt.split(/[.]/);
            const userJSON = atob(encodedPayload);
            const user = JSON.parse(userJSON);

            cacheKey = scryptSync(user.jwtid, jwtConfig.key, 64, { cost: 1024 }).toString('hex');

            const jwtSecret = await cacheRetrieve(`jti_${cacheKey}_secret`);
            if (jwtSecret) {
                jwtPayload = verify(jwt, jwtSecret);
                req.user = jwtPayload.sub || jwtPayload.subject;
            }
        }

        if (!jwtPayload && req.header('X-Impersonate-Key') === jwtConfig.impersonateKey) {
            console.log('Impersonation Key Present. Checking for Mock User.'); // eslint-disable-line
            const mockUserString = req.header('X-Impersonate');
            console.log(`Found: ${mockUserString || 'Nothing'}`); // eslint-disable-line
            if (mockUserString) {
                const mockUser = JSON.parse(mockUserString);
                req.user = mockUser;
            }
        }

        res.send = async (data) => {
            const { user } = req;

            if (user) {
                const jwtSecret = randomUUID();
                const jti = randomUUID();

                if (jwtPayload) {
                    await cacheDelete(`jti_${cacheKey}_secret`);
                }

                cacheKey = scryptSync(jti, jwtConfig.key, 64, { cost: 1024 }).toString('hex');

                await cacheStore(`jti_${cacheKey}_secret`, jwtSecret, jwtConfig.ttl);

                const token = sign({
                    expiresIn: jwtConfig.ttl * 1000,
                    jwtid: jti,
                    sub: user,
                }, jwtSecret);

                res.header('Access-Control-Expose-Headers', 'Authorization');
                res.header('Authorization', `Bearer ${token}`);
            }

            res.send = oldSend;
            res.send(data);
        };

        next();
    } catch (error) {
        next(error);
    }
};

export const authenticated = () => {
    const handler = (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401);
            return;
        }
        next();
    };
    handler.withRoles = {
        hasSome: (...roles) => {
            return (req, res, next) => {
                if (!req.user) {
                    res.sendStatus(401);
                    return;
                }
                const { user } = req;
                if (!user.roles || !roles.some((r) => user.roles.includes(r))) {
                    res.sendStatus(401);
                    return;
                }
                next();
            };
        },
        hasAll: (...roles) => {
            return (req, res, next) => {
                if (!req.user) {
                    res.sendStatus(401);
                    return;
                }
                const { user } = req;
                if (!user.roles || !roles.all((r) => user.roles.includes(r))) {
                    res.sendStatus(401);
                    return;
                }
                next();
            };
        },
    };
    handler.isMissing = () => {
        return (req, res, next) => {
            if (req.user) {
                res.sendStatus(401);
                return;
            }
            next();
        };
    };

    return handler;
};
