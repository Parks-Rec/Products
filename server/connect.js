const {Pool, Client} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user:process.env.USER,
  host:process.env.HOST,
  database:process.DATABASE,
  password:process.PASSWORD,
  port: process.env.PORT
})

module.exports = pool
