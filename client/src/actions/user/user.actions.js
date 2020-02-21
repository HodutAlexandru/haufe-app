import {history} from "../../util/util";
import {alertActions} from "../alert/alert.actions";
import {userService} from "../../services/user.service";

export const userActions = {
    register,
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: 'USER_LOGIN_REQUEST', user } }
    function success(user) { return { type: 'USER_LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'USER_LOGIN_FAIL', error } }
}

function logout() {
    userService.logout();
    return { type: 'USER_LOGOUT' };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: 'USER_REGISTER_REQUEST', user } }
    function success(user) { return { type: 'USER_REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'USER_REGISTER_FAIL', error } }
}