import express from 'express';

const router = express.Router();

export const getUsers = (req, res) => {
    res.json({
        users: [{ id: 1 }],
    });
};

router.get('/users', getUsers);

export default router;
