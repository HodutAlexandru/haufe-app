import {validateToken} from "../util/validation";
import {getResponse, getResponseWithValue, statusTypes} from "../helpers/responseTypes";

const express = require("express");
const pool = require("../util/db");

const router = express.Router();

router.get('/users/external', validateToken, (req, res, next) => {
   pool.query(`SELECT * from haufe.users WHERE role = 'external'`).then(result => {
      getResponseWithValue(statusTypes.ok, res, result.rows);
   }).catch(err => {
      getResponse(statusTypes.internalServerError, res);
   })
});

module.exports = router;