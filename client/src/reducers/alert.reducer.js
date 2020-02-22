import { handleActions } from "redux-actions";

const initialState = [];

export default handleActions({
    ALERT_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    ALERT_ERROR: (state, action) => ([
        ...state,
        action.payload
    ]),
    ALERT_CLEAR: (state, action) => ([
        ...state,
        action.payload
    ])
}, initialState)