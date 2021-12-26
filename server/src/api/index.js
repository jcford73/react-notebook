import express from 'express';
import cors from 'cors';
import { apiConfig, corsConfig } from '../environment/environment';
import { jwtRefresh } from './middleware/jwt';
import globalErrorHandler from './middleware/error-handler';
import login from './login';
import users from './users';
import notes from './notes';

const startExpressApp = async () => {
    const app = express();
    const router = express.Router();

    router.use((req, res, next) => cors({
        origin: (origin, callback) => {
            if (corsConfig.whitelist.includes(origin)) {
                callback(null, true);
            } else if (!origin && req.header('X-CORS-Bypass-Key') === corsConfig.corsBypassKey) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        optionsSuccessStatus: 200,
    })(req, res, next));

    router.use(jwtRefresh);
    router.use(express.json({ strict: true }));

    router.use(...login);
    router.use(...users);
    router.use(...notes);

    router.use(globalErrorHandler);

    app.use(apiConfig.baseUrl, router);

    return new Promise((resolve) => {
        app.listen(apiConfig.port, apiConfig.host, () => {
            console.log(`Server listening on ${apiConfig.port}`); // eslint-disable-line no-console
            resolve();
        });
    });
};

export default startExpressApp;
