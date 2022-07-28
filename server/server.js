const path = require('path');
const express = require('express');
require('dotenv').config();
const pool = require('./connect.js')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));



pool.connect()




app.listen(process.env.PORT, err => {
  if(err) {
    return console.log('ERROR', err)
  }
console.log(`You are listening to ${process.env.PORT}`);
})
