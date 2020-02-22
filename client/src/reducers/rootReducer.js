import {combineReducers} from "redux";

import alert from './alert.reducer';
import register from './register.reducer';
import auth from './auth.reducer';
import internalUser from './internal.user.reducer';

const rootReducer = combineReducers({
    alert,
    register,
    auth,
    internalUser
});

export default rootReducer;