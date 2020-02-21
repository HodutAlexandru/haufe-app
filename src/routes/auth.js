import {getLoginResponse, getResponse} from "../helpers/responseTypes";
import {statusTypes} from "../helpers/responseTypes";
import {User} from "../model/user";
import {jwtKey} from "../util/validation";
import {createUser} from "../util/db";

const express = require("express");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const pool = require("../util/db").pool;

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, null, null, (err, pwd) => {
        const user = new User(uniqid(), req.body.email, req.body.username, pwd, req.body.role);
        createUser(req, res, user);
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    pool.query(`SELECT * from haufe.users WHERE username = $1`, [req.body.username])
        .then(user => {
            if (!user) {
                return getResponse(statusTypes.unauthorized, res);
            }
            fetchedUser = user.rows[0];
            return bcrypt.compareSync(req.body.password, user.rows[0].password);
        })
        .then(result => {
            if (!result) {
                return getResponse(statusTypes.unauthorized, res);
            }
            const userId = fetchedUser.id;
            const token = jwt.sign({
                    userId: fetchedUser.id,
                    username: fetchedUser.username,
                    role: fetchedUser.role
                },
                jwtKey,
                {
                    algorithm: 'HS256',
                    expiresIn: "1h"
                });
            getLoginResponse(statusTypes.ok, res, userId, token, "Successfully logged in!", 3600);
        })
        .catch(error => {
            return getResponse(statusTypes.unauthorized, res);
        })
});

module.exports = router;