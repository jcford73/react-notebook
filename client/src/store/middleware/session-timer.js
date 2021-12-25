import { toast } from 'react-toastify';
import actionTypes from '../actions/action-types';
import { logOut } from '../actions/user-actions';

let timeout;

const sessionTimer = store => next => action => {

    if (action.type === actionTypes.JWT_RECEIVED) {
        if (timeout) {
            clearTimeout(timeout);
        }
        let [,payloadString] = action.jwt.split(/\./);
        payloadString = atob(payloadString);
        const payload = JSON.parse(payloadString);
        timeout = setTimeout(() => {
            toast.info('You have been automatically logged out.');
            store.dispatch(logOut());
            timeout = undefined;
        }, payload.expiresIn);
    }

    return next(action);
};

export default sessionTimer;
