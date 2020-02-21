import {getResponse, getResponseWithMessage, statusTypes} from "../helpers/responseTypes";

const Pool = require("pg").Pool;
const bcrypt = require("bcrypt-nodejs");

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port:  process.env.POSTGRES_PORT
});

function createUser(req, res, user) {
    pool.query(`SELECT * from haufe.users WHERE email = $1`, [user.email]).then(result => {
        if (result.rows.length === 0) {
            pool.query(`SELECT * FROM haufe.users WHERE username = $1`, [user.username])
                .then(result => {
                    if (result.rows.length === 0) {
                        pool.query(`INSERT INTO haufe.users(id, email, username, password, role) values ($1, $2, $3, $4, $5)`, [user.id, user.email, user.username, user.password, user.role])
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
    });
}

module.exports = {pool, createUser};