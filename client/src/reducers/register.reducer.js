export function register(state = {}, action) {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {registering: true};
        case 'USER_REGISTER_SUCCESS':
            return {};
        case 'USER_REGISTER_FAIL':
            return {};
        default:
            return state;
    }
}