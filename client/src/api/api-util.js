import { jwtReceived } from '../store/actions/user_actions';

export const apiUrl = process.env.API_URL;

export const thunkify = (apiCall) => {
    return (...args) => {
        return (dispatch, getState) => {
            return apiCall(getState, dispatch, ...args);
        };
    };
};

export async function apiErrorHandler(error) {
    console.log(error);
    throw error;
}

export async function apiIgnoreError(ignore) {
    return (error) => {
        if (error !== ignore) {
            throw error;
        }
        return Promise.reject();
    };
}

export const apiGet = (getState, dispatch, request) => {
    return apiFetch(getState, dispatch, {...request, method: 'get'});
};

export const apiPost = (getState, dispatch, request) => {
    return apiFetch(getState, dispatch, {...request, method: 'post'});
};

export const apiPut = (getState, dispatch, request) => {
    return apiFetch(getState, dispatch, {...request, method: 'put'});
};

export const apiDelete = (getState, dispatch, request) => {
    return apiFetch(getState, dispatch, {...request, method: 'delete'});
};

export const apiFetch = async (getState, dispatch, request) => {
    try {
        const currentUser = getState().currentUser;
        const jwt = currentUser && currentUser.jwt;
        const headers = new Headers(request.headers);

        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        if (jwt) {
            headers.set('Authorization', `Bearer ${jwt}`);
        }

        // debugger;
        const body = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);

        const response = await fetch(request.url, {
            ...request,
            method: request.method || 'get',
            mode: request.mode || 'cors',
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        if (response.headers.has('Authorization')) {
            let [, jwt] = response.headers.get('Authorization').split(/\s/);
            dispatch(jwtReceived(jwt));
        }

        if ( /json/.test(response.headers.get('content-type'))) {
            return response.json();
        } else {
            return response.text();
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
