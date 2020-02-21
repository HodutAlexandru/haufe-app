import {validateToken} from "../util/validation";
import {User} from "../model/user";
import {createUser} from "../util/db";

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const uniqid = require("uniqid");

const router = express.Router();

router.post('/users/external/create', validateToken, (req, res, next) => {
    bcrypt.hash(req.body.password, null, null, (err, pwd) => {
        const user = new User(uniqid(), req.body.email, req.body.username, pwd, 'external');
        createUser(req, res, user);
    });
});

module.exports = router;