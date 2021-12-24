import Note from '../models/note-model';
import { db } from './base-repository';

export const selectNotesByUserId = async (userId, select) => {
    return db(Note, async ({ repo }) => { //
        return repo.find({ where: { userId }, select });
    });
};

export const selectNoteById = async (id, select) => {
    return db(Note, async ({ repo }) => {
        const [note] = await repo.find({ where: { id }, select });
        return note;
    });
};

export const saveNote = async (note) => {
    return db(Note, async ({ repo }) => {
        note = await repo.save(note);
        return note;
    });
};

export const deleteNote = async (note) => {
    return db(Note, async ({ repo }) => {
        await repo.delete(note);
    });
};

export default {
    selectNotesByUserId,
    selectNoteById,
    saveNote,
    deleteNote,
};
