import express from 'express';
import { param } from 'express-validator';

import { authenticated } from '../middleware/jwt';
import validation from '../middleware/validation';
import { getNoteById } from '../../services/note/note-service';

const router = express.Router();

const validators = validation(
    authenticated(),
    param('id', 'Note id must be provided').not().isEmpty(),
);

export const getNote = async (req, res, next) => {
    try {
        const note = await getNoteById(req.params.id);
        if (note) {
            res.send(note);
            return;
        }
        res.sendStatus(404);
    } catch (error) {
        next(error);
    }
};

router.get('/notes/:id', validators, getNote);

export default router;
