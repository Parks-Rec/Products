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
    var totalProducts = count * page
    var queryString = `SELECT * FROM product WHERE id <= ${totalProducts}`
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
    var queryString = `SELECT json_build_object(
      'id', product.id,
      'name', product.name,
      'slogan', product.slogan,
      'description', product.description,
      'category', product.category,
      'default_price', product.default_price,
      'features', json_agg(json_build_object(
        'feature', features.feature,
        'value', features.value
      )))
      AS product
      FROM product
      INNER JOIN features ON product.id = features.product_id
      WHERE product.id = ${product_id}
      GROUP by product.id`;
    return pool.query(queryString)
    .then((data) => {
      return res.status(200).send(data.rows[0].product)
    })
    .catch((error) => {
      console.log(error, 'error in get  product by id')
    })
    pool.end()
  },

  getProductStyles:  (req, res) => {
    var productId = req.params.product_id;
    var queryString = `SELECT
    id AS product_id,
    (SELECT json_agg(json_build_object(
    'style_id', styles.id,
    'name', styles.name,
    'original_price', styles.original_price,
    'sale_price', styles.sale_price,
    'default?', styles.default_style,
    'photos', (SELECT json_agg(json_build_object('thumbnail_url', photos.thumbnail_url,'url', photos.url))
    FROM photos
    WHERE styles.id = photos.styleId),
    'skus', (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size))
    FROM skus
    WHERE skus.styleId = styles.id)
    ))
    AS results
    FROM styles
    WHERE styles.productId = ${productId}
    )
    FROM product
    WHERE id = ${productId}
    `;
    return pool.query(queryString)
    .then((data) => {
      return res.status(200).send(data.rows[0])
    })
    .catch((error) => {
      console.log(error, 'error in get product styles')
    })
    pool.end()
  },


getRelatedProducts:  (req, res) => {
  var product_id = req.params.product_id;
  console.log(product_id)
  console.log("++++++++++++++++++++++++++++++++++++++++++++++", req.params.product_id)
  var queryString = `SELECT json_agg(related_product_id)
  AS related
  FROM related
  WHERE related.current_product_id = ${product_id}`;
  return pool.query(queryString)
  .then((data) => {
    return res.status(200).send(data.rows[0].related)
  })
  .catch((error) => {
    console.log(error, 'error in get related product ')
  })
  pool.end()
},


// cart:  (req, res) => {
//   var product_id = req.params.product_id;
//   console.log(product_id)
//   console.log("++++++++++++++++++++++++++++++++++++++++++++++", req.params.product_id)
//   var queryString = `SELECT json_agg(
//     related_product_id
//   )
//   FROM related
//   WHERE related.current_product_id = ${product_id}`;
//   return pool.query(queryString)
//   .then((data) => {
//     return res.status(200).send(data.rows[0])
//   })
//   .catch((error) => {
//     console.log(error, 'error in get  product cart')
//   })
//   pool.end()
// }
}