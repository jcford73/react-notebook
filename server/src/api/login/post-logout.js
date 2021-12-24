import express from 'express';

const router = express.Router();

export const postLogout = async (req, res, next) => {
    try {
        delete req.user;
        res.setHeader('content-type', 'text/plain').sendStatus(200);
    } catch (error) {
        next(error);
    }
};

router.post('/logout', postLogout);

export default router;
