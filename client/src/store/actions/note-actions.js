import actions from './action-types';
import * as noteApi from '../../api/notes';

export const updateNote = (note) => {
    return  (dispatch, getState) => {
        return noteApi.putNote(getState, dispatch, note)
            .then(note => {
                if (note === 'throttled') {
                    return 'throttled';
                } else {
                    return dispatch(updateNoteSuccess(note));
                }
            });
    };
};

export const updateNoteSuccess = (note) => {
    return { type: actions.UPDATE_NOTE_SUCCESS, note };
};

export const getNote = (id) => {
    return async (dispatch, getState) => {
        try {
            const note = await noteApi.getNote(getState, dispatch, id);
            dispatch(getNoteSuccess(note));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

};

export const getNoteSuccess = (note) => {
    return {type: actions.GET_NOTE_SUCCESS, note };
};

export const addNote = () => {
    return async (dispatch, getState) => {
        const note = await noteApi.postNote(getState, dispatch, {title: 'Unnamed Note'});
        dispatch(addNoteSuccess(note));
        return note;
    };
};

export const addNoteSuccess = (note) => {
    return {type: actions.ADD_NOTE_SUCCESS, note};
};

export const deleteNote = (noteId) => {
    return async (dispatch, getState) => {
        await noteApi.deleteNote(getState, dispatch, noteId);
        dispatch(deleteNoteSuccess(noteId));
    };
};

export const deleteNoteSuccess = (noteId) => {
    return {type: actions.DELETE_NOTE_SUCCESS, noteId};
};
