import express from 'express';
import { body } from 'express-validator';

import { authenticated } from '../middleware/jwt';
import validation from '../middleware/validation';
import { addNote } from '../../services/note/note-service';

const router = express.Router();

const validators = validation(
    authenticated(),
    body(['title']).not().isEmpty(),
);

export const postNote = async (req, res, next) => {
    try {
        const note = await addNote(req.body, req.user.id);
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
        next(error);
    }
};

router.post('/notes', validators, postNote);

export default router;
