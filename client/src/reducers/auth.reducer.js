import { handleActions } from "redux-actions";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? [{loggedIn: true, user}] : [];

export default handleActions({
    LOGIN_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    LOGIN_FAILURE: (state, action) => ([
        ...state,
        action.payload
    ]),
    LOGOUT: (state, action) => ([
        ...state,
        action.payload
    ])
}, initialState);