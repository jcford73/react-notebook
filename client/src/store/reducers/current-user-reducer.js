import actions from '../actions/action-types';

const currentUserReducer = (state = {displayName: 'Guest'}, action) => {

    switch (action.type) {

        case actions.JWT_RECEIVED: {
            let [,payloadString] = action.jwt.split(/\./);
            payloadString = atob(payloadString);
            const payload = JSON.parse(payloadString);
            return {
                ...state,
                jwt: action.jwt,
                ...payload.sub,
            };
        }

        case actions.LOGOUT_SUCCESS: {
            return {
                displayName: 'Guest'
            };
        }

        default:
            return state;

    }

};

export default currentUserReducer;
