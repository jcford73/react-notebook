import express from 'express';
import { body } from 'express-validator';

import { login } from '../../services/auth/auth-service';
import validation from '../middleware/validation';

const router = express.Router();

const validators = validation(
    body('username', 'Username must be an email address').isEmail(),
    body('password', 'Password must be provided.').exists().not().isEmpty(),
);

export const postLogin = async (req, res, next) => {
    try {
        const user = await login(req.body);
        req.user = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            roles: user.roles,
            isAdmin: user.isAdmin,
        };
        res.send({ notes: user.notes });
    } catch (error) {
        if (error.message === 'fail-login') {
            res.sendStatus(401);
        }
        next(error);
    }
};

router.post('/login', validators, postLogin);

export default router;
