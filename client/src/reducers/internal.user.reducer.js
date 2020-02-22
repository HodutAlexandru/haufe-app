import { handleActions } from 'redux-actions';

const initialState = []

export default handleActions({
    GET_EXTERNAL_USERS_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    GET_EXTERNAL_USERS_FAILURE: (state, action) => ([
        ...state,
        action.payload
    ]),
    CREATE_EXTERNAL_USER_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    CREATE_EXTERNAL_USER_FAILURE: (state, action) => ([
        ...state,
        action.payload
    ]),
    DELETE_EXTERNAL_USER_SUCCESS: (state, action) => ([
        ...state,
        action.payload
    ]),
    DELETE_EXTERNAL_USER_FAILURE: (state, action) => ([
        ...state,
        action.payload
    ])
}, initialState)