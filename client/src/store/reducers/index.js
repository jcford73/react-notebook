import {combineReducers} from 'redux';
import notes from './notes-reducer';
import currentUser from './current-user-reducer';

const rootReducer = combineReducers({
    notes,
    currentUser,
});

export default rootReducer;
