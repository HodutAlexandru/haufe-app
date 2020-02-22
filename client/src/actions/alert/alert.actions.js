import {createAction} from "redux-actions";
import {alertConstants} from "../../constants/alert.constants";

const success = createAction(alertConstants.ALERT_SUCCESS);
const error = createAction(alertConstants.ALERT_ERROR);
const clear = createAction(alertConstants.ALERT_CLEAR);

export const alertActions = {
    success,
    error,
    clear
};