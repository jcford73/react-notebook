import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import sessionTimer from './middleware/session-timer';

const loadStore = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Could not load state from sessionStorage.');
        return undefined;
    }
};

const saveStore = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state',serializedState);
    } catch (error) {
        console.error('Could not save state to sessionStorage.');
        console.error(error);
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {

    const initialState = loadStore();
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant(), sessionTimer)));

    store.subscribe(() => {
        saveStore(store.getState());
    });

    return store;

};

export default configureStore;
