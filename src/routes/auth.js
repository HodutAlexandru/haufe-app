import {getLoginResponse, getResponse, getResponseWithMessage} from "../helpers/responseTypes";
import {statusTypes} from "../helpers/responseTypes";
import {User} from "../model/user";

const express = require("express");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const pool = require("../util/db");

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, null, null, (err, pwd) => {
        const user = new User(uniqid(), req.body.email, req.body.username, pwd);
        pool.query(`SELECT * from haufe.users WHERE email = $1`, [user.email]).then(result => {
            if (result.rows.length === 0) {
                pool.query(`SELECT * FROM haufe.users WHERE username = $1`, [user.username])
                    .then(result => {
                        if (result.rows.length === 0) {
                            pool.query(`INSERT INTO haufe.users(id, email, username, password) values ($1, $2, $3, $4)`, [user.id, user.email, user.username, user.password])
                                .then(result => {
                                    getResponse(statusTypes.created, res);
                                })
                                .catch(error => {
                                    getResponse(statusTypes.internalServerError, res);
                                });
                        } else {
                            return getResponseWithMessage(statusTypes.badRequest, res, `User with username ${user.username} already exists!`)
                        }
                    })
                    .catch(err => {
                        return getResponse(statusTypes.internalServerError, res);
                    });
            } else {
                return getResponseWithMessage(statusTypes.badRequest, res, `User with email ${user.email} already exists!`)
            }
        })
            .catch(err => {
                return getResponse(statusTypes.internalServerError, res);
            });
    });

})
;

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
                    username: fetchedUser.username
                },
                "YxVDr4BYHmS+9KOcLn+FgtvpZ/7MorbZJUbn9ncYmpMbeI51LTpVxKy4Xs91R6XkBEsiYtR8AG1lUrGIRBda48Pgjol6t1uhM5prjFMED5NmH0FJzCaUzxCjE9LirVmOl3cvvA3lHhqvXFzrl3ox0jIQluzNlSMWQ8ZVq6b7rzWpXX2KEmcChUBfza7LIoPPpMMc+f8QQP1H1r3UPfhufDq3NJzm2RatcxvIZhpTUuyISfZwsOo5AmeqE+eh1L4gyEWKfShfOevG6g089LpESqgJ/RbQeWijMav+fRhC7+OnSnLR6Qoev9IFGkSWo0LQ/b0E6GVyCQzUoiW9VZUoOg==",
                {
                    expiresIn: "1h"
                });
            getLoginResponse(statusTypes.ok, res, userId, token, "Successfully logged in!", 3600);
        })
        .catch(error => {
            return getResponse(statusTypes.unauthorized, res);
        })
});

module.exports = router;