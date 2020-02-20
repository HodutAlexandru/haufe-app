const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port:  process.env.POSTGRES_PORT
});

module.exports = pool;