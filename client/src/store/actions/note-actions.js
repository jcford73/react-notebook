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

// export function loadNotes() {
//     return function (dispatch) {
//         dispatch(loadNotesStarted());
//         getNotes()
//             .then(notes => dispatch(loadNotesSuccess(notes)))
//             .catch(error => dispatch(loadNotesFailure(error)));
//     };
// }

// export function loadNotesStarted() {
//     return { type: actions.LOAD_NOTES_STARTED };
// }

// export function loadNotesSuccess(notes) {
//     return { type: actions.LOAD_NOTES_SUCCESS, notes};
// }

// export function loadNotesFailure(error) {
//     return { type: actions.LOAD_NOTES_FAILURE, error};
// }
