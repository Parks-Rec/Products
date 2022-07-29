const pool = require ('./connect.js')

pool.connect()
.then(()=> {
  console.log('Databse connected at pool')
})
.catch((err) => {
  console.log(err, 'error in database pool')
})