import { apiDelete, apiGet, apiPost, apiPut, apiUrl } from './api-util';

export const getNote = (getState, dispatch, id) => {
    return apiGet(getState, dispatch, {url: `${apiUrl}/notes/${id}`});
};

export const putNote = (getState, dispatch, note) => {

    return apiPut(getState, dispatch, {
        url: `${apiUrl}/notes/${note.id}`,
        body: note
    });
};

export const postNote = (getState, dispatch, note) => {
    return apiPost(getState, dispatch, {
        url: `${apiUrl}/notes`,
        body: note
    });
};

export const deleteNote = (getState, dispatch, noteId) => {
    return apiDelete(getState, dispatch, {
        url: `${apiUrl}/notes/${noteId}`,
    });
};
