import actions from '../actions/action-types';

const notesReducer = (state = {}, action) => {

    switch(action.type) {

        case actions.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                [action.note.id]: {
                    ...state[action.note.id],
                    ...action.note,
                }};

        case actions.GET_NOTE_SUCCESS:
            return {
                ...state,
                [action.note.id]:{
                    ...action.note,
                }
            };

        case actions.ADD_NOTE_SUCCESS:
            return {
                ...state,
                [action.note.id]:{
                    ...action.note,
                }
            };

        case actions.DELETE_NOTE_SUCCESS:
            return Object.values(state)
                .filter(note => note.id != action.noteId)
                .reduce((map,note)=>({...map,[note.id]:note}),{});

        case actions.LOGIN_SUCCESS:
            return action.notes.reduce((map,note)=>({...map,[note.id]:note}),{});

        case actions.LOGOUT_SUCCESS:
            return {};

        default:
            return state;

    }

};

export default notesReducer;
