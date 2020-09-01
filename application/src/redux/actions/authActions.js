import { LOGIN, LOGOUT } from './types';
import { SERVER_IP } from '../../private';

const TOKEN_KEY = 'jwt';

const finishLogin = (email, token) => {
    return {
        type: LOGIN,
        payload: {
            email,
            token,
        }
    }
}

export const loginUser = (email, password) => {
    // Clear the local storage if user doesnt enter a email/password
    if (email === '' || password === '') {
        return logoutUser();
    } 
    // set the local storage so next page will populate after login
    return (dispatch) => {
        localStorage.setItem(TOKEN_KEY, 'needstohappenfirst');
        fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem(TOKEN_KEY, response.token);
                dispatch(finishLogin(response.email, response.token));
            }
        })
    };
}

export const logoutUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
        type: LOGOUT,
        payload: null,
    }
}