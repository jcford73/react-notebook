import Note from '../../models/note-model';
import notesRepo from '../../repository/notes-repository';
import { getUserById } from '../user/user-service';

const createSlug = (title) => title && title
    .toLowerCase()
    .replace(/[.-/\\()[\]{}]/g, ' ')
    .trim()
    .split(/\s+/)
    .join('_')
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 50);

export const getNotesForUser = async (userId) => {
    return notesRepo.selectNotesByUserId(userId, ['id', 'slug', 'title', 'description']);
};

export const getNoteById = async (id) => {
    const note = await notesRepo.selectNoteById(id, ['id', 'slug', 'title', 'description', 'body']);
    return note;
};

export const addNote = async (noteData, userId) => {
    noteData.slug = createSlug(noteData.title);
    if (!noteData.slug) {
        throw Error('invalid-title');
    }
    const user = await getUserById(userId);
    let note = new Note({
        slug: noteData.slug,
        title: noteData.title,
        description: noteData.description,
        body: noteData.body,
        userId: user.id,
    });
    user.notes = [note];
    note = await notesRepo.saveNote(note);
    return note;
};

export const updateNote = async (noteData, userId) => {
    let note = await notesRepo.selectNoteById(noteData.id);
    if (!note) {
        throw Error('not-found');
    }
    if (note.userId !== userId) {
        throw Error('unauthorized');
    }
    noteData.slug = createSlug(noteData.title);
    if (!noteData.slug) {
        throw Error('invalid-title');
    }
    note = new Note({
        ...note,
        slug: noteData.slug,
        title: noteData.title,
        ...(noteData.hasOwnProperty('description') && { description: noteData.description }),
        ...(noteData.hasOwnProperty('body') && { body: noteData.body }),
    });
    note = await notesRepo.saveNote(note);
    return note;
};

export const removeNote = async (noteId, userId) => {
    const note = await notesRepo.selectNoteById(noteId, ['id', 'userId']);
    if (!note) {
        throw Error('not-found');
    }
    if (note.userId !== userId) {
        throw Error('unauthorized');
    }
    await notesRepo.deleteNote(note);
};
