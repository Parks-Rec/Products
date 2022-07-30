require('dotenv').config();
const path = require('path');
const express = require('express');
var router = require('./routes.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));


app.use('/parks', router);


app.listen(process.env.PORT)
console.log(`You are listening to ${process.env.PORT}`);

