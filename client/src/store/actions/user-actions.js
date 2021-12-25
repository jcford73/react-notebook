import { postLogin, postLogout, postUser } from '../../api/auth';
import actions from './action-types';

export const login = (credentials) => {
    return async (dispatch, getState) => {
        try {
            const {notes} = await postLogin(getState, dispatch, credentials);
            dispatch(loginSuccess(notes));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};

export const jwtReceived = (jwt) => {
    return { type: actions.JWT_RECEIVED, jwt };
};

export const loginSuccess = (notes) => {
    return { type: actions.LOGIN_SUCCESS, notes };
};

export const logOut = () => {
    return async (dispatch, getState) => {
        try {
            await postLogout(getState, dispatch);
            dispatch(logoutSuccess());
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};

export const logoutSuccess = () => {
    return { type: actions.LOGOUT_SUCCESS };
};

export const signUp = (newUser) => {
    return async (dispatch, getState) => {
        const {notes} = await postUser(getState, dispatch, newUser);
        dispatch(loginSuccess(notes));
    };
};
