let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function auth(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            };
        case 'USER_LOGIN_SUCCESS':
            return {
                loggedIn: true,
                user: action.user
            };
        case 'USER_LOGIN_FAILURE':
            return {};
        case 'USER_LOGOUT':
            return {};
        default:
            return state;
    }
}