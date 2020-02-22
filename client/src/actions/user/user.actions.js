import {createAction} from "redux-actions";
import {userConstants} from "../../constants/user.constants";

const registerSuccess = createAction(userConstants.REGISTER_SUCCESS);
const registerFailure = createAction(userConstants.REGISTER_FAILURE);
const loginSuccess = createAction(userConstants.LOGIN_SUCCESS);
const loginFailure = createAction(userConstants.LOGIN_FAILURE);
const logout = createAction(userConstants.LOGOUT);

export const userActions = {
    registerSuccess,
    registerFailure,
    loginSuccess,
    loginFailure,
    logout
};