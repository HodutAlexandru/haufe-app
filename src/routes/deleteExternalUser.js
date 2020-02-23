import {validateToken} from "../util/validation";
import {getResponse, statusTypes} from "../helpers/responseTypes";

const express = require("express");
const { pool } = require("../util/db");

const router = express.Router();

router.delete("/users/external/delete/", validateToken, (req, res) => {
   pool.query(`DELETE FROM haufe.users WHERE id = $1`, [req.query.userId])
       .then(() => {
            getResponse(statusTypes.noContent, res);
       })
       .catch(() => {
           getResponse(statusTypes.internalServerError, res);
       })
});

module.exports = router;