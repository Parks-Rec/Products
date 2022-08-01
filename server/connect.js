const {Pool, Client} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: "david.arredondo",
  host: "localhost",
  database: "products",
  password: process.env.PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

pool.connect()
.then(() => {
  console.log('Pool your connected')
})
.catch((err) => {
  console.log(err, 'why arent you working')
})

module.exports = pool
