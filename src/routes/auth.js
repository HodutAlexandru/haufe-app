const express = require("express");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const pool = require("../util/db");

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, null, null, (err, pwd) => {
        const user = {
            id: uniqid(),
            email: req.body.email,
            username: req.body.username,
            password: pwd
        };
        pool.query(`SELECT * from haufe.users WHERE email = $1`, [user.email]).then(result => {
            if (result.rows.length === 0) {
                pool.query(`SELECT * FROM haufe.users WHERE username = $1`, [user.username])
                    .then(result => {
                        if (result.rows.length === 0) {
                            pool.query(`INSERT INTO haufe.users(id, email, username, password) values ($1, $2, $3, $4)`, [user.id, user.email, user.username, user.password])
                                .then(result => {
                                    res.status(201).json({
                                        message: 'User created successfully!'
                                    });
                                })
                                .catch(error => {
                                    res.status(500).json({
                                        message: 'Could not create user!',
                                        error: error
                                    });
                                });
                        } else {
                            return res.status(400).json({
                                message: `User with username ${user.username} already exists! Please provide another username!`
                            });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: `Unexpected error occured!`
                        });
                    });
            } else {
                return res.status(400).json({
                    message: `User with email ${user.email} already exists!`
                });
            }
        })
            .catch(err => {
                return res.status(500).json({
                    message: `Unexpected error occured!`
                });
            });
    });

})
;

router.post("/login", (req, res, next) => {
    let fetchedUser;
    pool.query(`SELECT * from haufe.users WHERE username = $1`, [req.body.username])
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: `No user with username ${req.body.username} exists!`
                });
            }
            fetchedUser = user.rows[0];
            return bcrypt.compareSync(req.body.password, user.rows[0].password);
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