const getAllProducts = require("./models.js");
var express = require('express')
const {Pool, Client} = require('pg');
const pool = require('./connect.js')



// module.exports = {
//   getAllProducts:  async (req, res) => {
//     // console.log("++++++++++++++++++++++++++++++++++++++++++++++")
//     try {
//       const data = await getAllProducts.getAllProducts()
//       res.status(200).send(data.rows)
//     } catch (err){
//       res.status(400).send(err)
//     }
//   }
// }

module.exports = {
  getAllProducts:  (req, res) => {
    var count = req.query.count || 5
    var page = req.query.page || 1
    console.log("++++++++++++++++++++++++++++++++++++++++++++++", req)
    var queryString = `SELECT * FROM product WHERE id <= ${count}`
    return pool.query(queryString)
    .then((data) => {
      return res.status(200).send(data.rows)
    })
    .catch((error) => {
      console.log(error, 'error in get all products')
    })
    pool.end()
  },

  getProductByID:  (req, res) => {




    var product_id = req.params.product_id;
    console.log("++++++++++++++++++++++++++++++++++++++++++++++", req.params.product_id)
    var queryString = `SELECT
      'id', product.id,
      'name', product.name,
      'slogan', product.slogan,
      'description', product.description,
      'category', product.category,
      'default_price', product.default_price,
      'features', json_agg(
        json_build_object(
        'feature', features.feature,
        'value', features.value
      ))
      FROM product
      JOIN features ON product.id = features.product_id
      WHERE product.id = ${product_id}
      GROUP by product.id`;
    return pool.query(queryString)
    .then((data) => {
      return res.status(200).send(data.rows[0])
    })
    .catch((error) => {
      console.log(error, 'error in get all products')
    })
    pool.end()
  }
}