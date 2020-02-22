import {apiBaseUrl, history} from "../util/util";
import {store} from "../util/store";

export const userService = {
    register,
    login,
    logout,
    autoAuth,
    getExternalUsers,
    createExternalUser,
    deleteExternalUser
}

function register(user) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiBaseUrl}/register`, request).then(handleResponse);
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiBaseUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(res => {
            const user = {
                userId: res.userId,
                token: res.token,
                expiresIn: res.expiresIn
            };
            loginHelper(user);

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    history.push('/');
}

function getExternalUsers() {
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const stateLength = store.getState().auth.length;
    const token = store.getState().auth[stateLength - 1].token;

    return fetch(`${apiBaseUrl}/users/external?token=${token}`, request).then(handleResponse);
}

function createExternalUser(user) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const stateLength = store.getState().auth.length;
    const token = store.getState().auth[stateLength - 1].token;

    return fetch(`${apiBaseUrl}/users/external/create?token=${token}`, request).then(handleResponse);
}

function deleteExternalUser(user) {
    const request = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user.username)
    };

    const stateLength = store.getState().auth.length;
    const token = store.getState().auth[stateLength - 1].token;

    return fetch(`${apiBaseUrl}/users/external/delete?token=${token}`, request).then(handleResponse);
}

function loginHelper(user) {
    const tokenExpiration = user.expiresIn;
    setAuthTimer(tokenExpiration);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + tokenExpiration * 1000);
    saveAuthData(user, expirationDate);
}

function autoAuth() {
    const authInfo = getAuthData();
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
        console.log(authInfo.user);
        localStorage.setItem('user', authInfo.user);
        setAuthTimer(expiresIn / 1000);
    }
}

function getAuthData() {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const token = userData.token;
    const expirationDate = localStorage.getItem('expirationDate');

    if(!token || !expirationDate) {
        return;
    }

    return {
        user: user,
        expirationDate: new Date(expirationDate)
    }
}

function saveAuthData(user, expirationDate) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expirationDate', expirationDate);
}

function setAuthTimer(duration) {
    setTimeout(() => {
        this.handleLogout();
    }, duration * 1000);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}