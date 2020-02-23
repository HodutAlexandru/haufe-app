import {getResponse, getResponseWithMessage, statusTypes} from "../helpers/responseTypes";

const Pool = require("pg").Pool;
const instagram = require('ml-image-searcher');

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
                        instagram.getImages(user.username).then(result => {
                            const bestResults = result.htmlFilteredData;
                            const firstResult = bestResults.split('src="').pop().split('"')[0];
                            pool.query(`INSERT INTO haufe.users(id, email, username, password, role, imgSource) values ($1, $2, $3, $4, $5, $6)`, [user.id, user.email, user.username, user.password, user.role, firstResult])
                                .then(result => {
                                    getResponse(statusTypes.created, res);
                                })
                                .catch(error => {
                                    getResponseWithMessage(statusTypes.internalServerError, res, error);
                                });
                        });
                    } else {
                        return getResponseWithMessage(statusTypes.badRequest, res, `User with username ${user.username} already exists!`)
                    }
                })
                .catch(err => {
                    return getResponseWithMessage(statusTypes.internalServerError, res, err);
                });
        } else {
            return getResponseWithMessage(statusTypes.badRequest, res, `User with email ${user.email} already exists!`)
        }
    });
}

module.exports = {pool, createUser};