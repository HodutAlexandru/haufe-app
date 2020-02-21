export const statusTypes = {
    ok: {
        statusCode: 200,
        message: 'Request successfully!'
    },
    created: {
        statusCode: 201,
        message: 'Resource created successfully!'
    },
    noContent: {
        statusCode: 204,
        message: 'No content'
    },
    badRequest: {
        statusCode: 400,
        message: 'Bad request!'
    },
    unauthorized: {
        statusCode: 401,
        message: 'Unauthorized!'
    },
    internalServerError: {
        statusCode: 500,
        message: 'Internal Server error!'
    }
}

export function getResponse(action, res) {
    return res.status(action.statusCode).json({
        statusCode: action.statusCode,
        message: action.message
    });
}

export function getResponseWithMessage(action, res, message) {
    return res.status(action.statusCode).json({
        statusCode: action.statusCode,
        message: message
    });
}

export function getLoginResponse(action, res, userId, token, message, expirationTime) {
    return res.status(action.statusCode).json({
        statusCode: action.statusCode,
        userId: userId,
        message: message,
        token: token,
        expiresIn: expirationTime
    });
}

export function getResponseWithValue(action, res, value) {
    return res.status(action.statusCode).json({
        statusCode: action.statusCode,
        message: action.message,
        value: value
    });
}