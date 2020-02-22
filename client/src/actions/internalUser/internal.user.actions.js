import { createAction } from "redux-actions";
import {internalUserConstants} from "../../constants/internal.user.constants";

const getExternalUsersSuccess = createAction(internalUserConstants.GET_EXTERNAL_USERS_SUCCESS);
const getExternalUsersFailure = createAction(internalUserConstants.GET_EXTERNAL_USERS_FAILURE);
const createExternalUserSuccess = createAction(internalUserConstants.CREATE_EXTERNAL_USER_SUCCESS);
const createExternalUserFailure = createAction(internalUserConstants.CREATE_EXTERNAL_USER_FAILURE);
const deleteExternalUserSuccess = createAction(internalUserConstants.DELETE_EXTERNAL_USER_SUCCESS);
const deleteExternalUserFailure = createAction(internalUserConstants.DELETE_EXTERNAL_USER_FAILURE);

export const internalUserActions = {
    getExternalUsersSuccess,
    getExternalUsersFailure,
    createExternalUserSuccess,
    createExternalUserFailure,
    deleteExternalUserSuccess,
    deleteExternalUserFailure
};