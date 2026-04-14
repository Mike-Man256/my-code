const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5000,
  database: 'banking_ledger',
  user: 'postgres',
  password: 'Mikestar256',
});

pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch((err) => console.error('Connection error', err));

module.exports = pool;