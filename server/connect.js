const {Pool, Client} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRESPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

pool.connect()
.then(() => {
  console.log('Pool  connected')
})
.catch((err) => {
  console.log(err, 'Pool not connected')
})

module.exports = pool
