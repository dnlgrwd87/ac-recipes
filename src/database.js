require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction
});

module.exports = { db };
