import express from 'express';
import { body } from 'express-validator';

import { authenticated } from '../middleware/jwt';
import validation from '../middleware/validation';
import { updateNote } from '../../services/note/note-service';

const router = express.Router();

const validators = validation(
    authenticated(),
    body('id', 'Id is required').not().isEmpty(),
    body('title', 'Title is required').not().isEmpty(),
);

export const putNote = async (req, res, next) => {
    try {
        const note = await updateNote(req.body, req.user.id);
        if (note) {
            res.send(note);
            return;
        }
        next(Error('Failed to save note.'));
    } catch (error) {
        if (error.message === 'invalid-title') {
            res.status(400).send([
                {
                    msg: 'Invalid Title',
                    param: 'title',
                    locaation: 'body',
                },
            ]);
            return;
        }
        if (error.message === 'not-found') {
            res.sendStatus(404);
            return;
        }
        if (error.message === 'access-denied') {
            res.sendStatus(401);
            return;
        }
        next(error);
    }
};

router.put('/notes/:id', validators, putNote);

export default router;
