import { apiPost, apiUrl } from './api-util';

export const postLogin = async (getState, dispatch, credentials) => {
    return await apiPost(getState, dispatch, {
        url: `${apiUrl}/login`,
        body: credentials
    });
};

export const postLogout = async (getState, dispatch) => {
    return await apiPost(getState, dispatch, {
        url: `${apiUrl}/logout`
    });
};

export const postUser = async (getState, dispatch, user) => {
    return await apiPost(getState, dispatch, {
        url: `${apiUrl}/users`,
        body: user,
    });
};
