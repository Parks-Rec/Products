const path = require('path');
const express = require('express');
const router = require('./routes.js')
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/products', router)




app.listen(process.env.PORT,() => {
console.log(`You are listening to ${process.env.PORT}`);
})
