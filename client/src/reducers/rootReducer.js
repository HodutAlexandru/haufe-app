import {combineReducers} from "redux";

import { alert } from './alert.reducer';
import { register } from './register.reducer';
import { auth } from './auth.reducer';

const rootReducer = combineReducers({
    alert,
    register,
    auth
});

export default rootReducer;