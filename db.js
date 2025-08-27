const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       // PostgreSQL username
    host: 'localhost',
    database: 'expenses_tracker',
    password: 'jakka@12345',
    port: 5432,
});

module.exports = pool;
