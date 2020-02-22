import { handleActions } from "redux-actions";

const initialState = [];

export default handleActions({
    REGISTER_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    REGISTER_FAILURE: (state, action) => ([
        ...state,
        action.payload
    ])
}, initialState);