import actions from '../actions/action-types';

const notesReducer = (state = {}, action) => {

    switch(action.type) {

        case actions.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                [action.note.id]: {
                    ...state[action.note.id],
                    body: action.note.body,
                }};

        case actions.GET_NOTE_SUCCESS:
            return {
                ...state,
                [action.note.id]:{
                    ...action.note,
                }
            };

        case actions.LOGIN_SUCCESS:
            return action.notes.reduce((map,note)=>({...map,[note.id]:note}),{});

        default:
            return state;

    }

};

export default notesReducer;
