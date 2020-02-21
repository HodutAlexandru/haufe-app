import {validateToken} from "../util/validation";
import {getResponse, getResponseWithValue, statusTypes} from "../helpers/responseTypes";

const express = require("express");
const {pool} = require("../util/db");

const router = express.Router();

router.delete("/users/external/delete/", validateToken, (req, res, next) => {
   pool.query(`DELETE FROM haufe.users WHERE username = $1`, [req.body.username])
       .then(() => {
            getResponse(statusTypes.noContent, res);
       })
       .catch(() => {
           getResponse(statusTypes.internalServerError, res);
       })
});

module.exports = router;