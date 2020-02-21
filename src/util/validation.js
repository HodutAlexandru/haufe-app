import {getResponse, statusTypes} from "../helpers/responseTypes";

const jwt = require("jsonwebtoken");

export const jwtKey = 'privateKey';

export const validateToken = (req, res, next) => {
    const token = req.query.token;

    if(!token) {
        return getResponse(statusTypes.unauthorized, res);
    }

    try {
        jwt.verify(token, jwtKey, {
            algorithms: ['HS256']
        });
    } catch (err) {
        return getResponse(statusTypes.unauthorized, res);
    }

    next();
}