const express = require("express");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");

const pool = require("../util/db");

const router = express.Router();

router.post("/register", (req, res, next) => {
    const user = {
        id: uniqid(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    pool.query(`INSERT INTO haufe.users(id, email, username, password) values ($1, $2, $3, $4)`, [user.id, user.email, user.username, user.password])
        .then(result => {
            res.status(201).json({
                message: 'User created successfully!',
                user: result.rows
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not create user!',
                error: error
            })
        })
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    pool.query(`SELECT * from haufe.users WHERE username IS $1`, [req.username])
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: `No user with username ${user.username} exist!`
                });
            }
            fetchedUser = user;
            return req.body.password === user.password;
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Wrong password! Please try again!"
                });
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

            res.status(200).json({
                userId: userId,
                message: "Successfully logged in!",
                token: token,
                expiresIn: 3600
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: "Wrong username! Please try again",
                err: error
            })
        })
});

module.exports = router;