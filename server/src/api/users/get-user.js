import express from 'express';
import { authenticated } from '../middleware/jwt';

const router = express.Router();

export const getUser = (req, res) => {
    res.json({ id: 1 });
};

router.get('/users/:id', authenticated(), getUser);

export default router;
