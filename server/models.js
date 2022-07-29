const {Pool, Client} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});


pool.connect()
.then(()=> {
  console.log('Database connected at pool')
})
.catch((err) => {
  console.log(err, 'error in database pool')
})

getAllProducts = () => {
  var queryString = 'SELECT * FROM product'
  pool.query(queryString)
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(error, 'error in get all products model')
  })
  pool.end();
}

module.exports.getAllProducts = getAllProducts;