import express from 'express';
import { body } from 'express-validator';

import { authenticated } from '../middleware/jwt';
import validation from '../middleware/validation';
import { saveUser } from '../../services/user/user-service';

const router = express.Router();

const validators = validation(
    authenticated().isMissing(),
    body('username', 'Username is required.').not().isEmpty(),
    body('password', 'Password is required.').not().isEmpty(),
    body('displayName', 'Display name is required.').not().isEmpty(),
    body('username', 'Username must be a valid email address').isEmail({ domain_specific_validation: true, require_tld: true }),
    body('password', 'Password is too weak.').isStrongPassword(),
);

export const postUser = async (req, res, next) => {
    try {
        const user = await saveUser(req.body);
        req.user = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            roles: user.roles,
        };
        res.send({ notes: user.notes });
    } catch (error) {
        if (error.message === 'username-conflict') {
            res.status(400).send([
                {
                    msg: 'Username in use',
                    param: 'username',
                    locaation: 'body',
                },
            ]);
            return;
        }
        next(error);
    }
};

router.post('/users', validators, postUser);

export default router;
