import {apiBaseUrl, history} from "../util/util";

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
    localStorage.removeItem('expirationDate');
    history.push('/');
}

function getExternalUsers() {
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    return fetch(`${apiBaseUrl}/users/external?token=${token}`, request).then(handleResponse);
}

function createExternalUser(user) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData.token;

    return fetch(`${apiBaseUrl}/users/external/create?token=${token}`, request).then(handleResponse);
}

function deleteExternalUser(userId) {
    const request = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData.token;

    return fetch(`${apiBaseUrl}/users/external/delete?token=${token}&userId=${userId}`, request).then(handleResponse);
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
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}