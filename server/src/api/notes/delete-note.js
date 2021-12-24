import express from 'express';
import { param } from 'express-validator';

import { authenticated } from '../middleware/jwt';
import validation from '../middleware/validation';
import { removeNote } from '../../services/note/note-service';

const router = express.Router();

const validators = validation(
    authenticated(),
    param('id').not().isEmpty(),
);

export const deleteNote = async (req, res, next) => {
    try {
        await removeNote(req.params.id, req.user.id);
        res.sendStatus(200);
    } catch (error) {
        if (error.message === 'not-found') {
            res.sendStatus(404);
            return;
        } if (error.message === 'unauthorized') {
            res.sendStatus(401);
            return;
        }
        next(error);
    }
};

router.delete('/notes/:id', validators, deleteNote);

export default router;
