import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = { email: null, token: null };
const TOKEN_KEY = 'jwt';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem(TOKEN_KEY, action.payload.token);
            return { ...state, email: action.payload.email, token: action.payload.token }
        case LOGOUT:
            localStorage.removeItem(TOKEN_KEY);
            return {};
        default:
            if (localStorage.getItem(TOKEN_KEY)) {
                return state;
            }
            return {};
    }
}