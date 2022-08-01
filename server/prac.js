
// // var express = require('express')
// // const {Pool, Client} = require('pg');
// // const pool = require('./connect.js')

// // //Do I have to use params ?
// // module.exports = {
// //   getAllProducts:  (req, res) => {
// //     var count = req.query.count || 5
// //     var page = req.query.page - 1 || 0
// //     var totalProducts = count * page
// //     // var queryString = `SELECT * FROM product WHERE id <= ${totalProducts}`
// //     var queryString = `SELECT * FROM product LIMIT ${count} OFFSET ${totalProducts}`
// //     return pool.query(queryString)
// //     .then((data) => {
// //       return res.status(200).send(data.rows)
// //     })
// //     .catch((error) => {
// //       console.log(error, 'error in get all products')
// //     })
// //     pool.end()
// //   },

// //   getProductByID:  (req, res) => {
// //     var product_id = req.params.product_id;
// //     var queryString = `SELECT json_build_object(
// //       'id', product.id,
// //       'name', product.name,
// //       'slogan', product.slogan,
// //       'description', product.description,
// //       'category', product.category,
// //       'default_price', product.default_price,
// //       'features', json_agg(json_build_object(
// //         'feature', features.feature,
// //         'value', features.value
// //       )))
// //       AS product
// //       FROM product
// //       INNER JOIN features ON product.id = features.product_id
// //       WHERE product.id = ${product_id}
// //       GROUP by product.id`;
// //     return pool.query(queryString)
// //     .then((data) => {
// //       return res.status(200).send(data.rows[0].product)
// //     })
// //     .catch((error) => {
// //       console.log(error, 'error in get  product by id')
// //     })
// //     pool.end()
// //   },

// //   getProductStyles:  (req, res) => {
// //     var productId = req.params.product_id;
// //     console.log(productId)
// //     console.log("++++++++++++++++++++++++++++++++++++++++++++++", req.params)
// //     var queryString = `SELECT
// //     id AS product_id,
// //     (SELECT json_agg(json_build_object(
// //     'style_id', styles.id,
// //     'name', styles.name,
// //     'original_price', styles.original_price,
// //     'sale_price', styles.sale_price,
// //     'default?', styles.default_style,
// //     'photos', (SELECT json_agg(json_build_object('thumbnail_url', photos.thumbnail_url,'url', photos.url))
// //     FROM photos
// //     WHERE styles.id = photos.styleId),
// //     'skus', (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size))
// //     FROM skus
// //     WHERE skus.styleId = styles.id)
// //     ))
// //     AS results
// //     FROM styles
// //     WHERE styles.productId = ${productId}
// //     )
// //     FROM product
// //     WHERE id = ${productId}
// //     `;
// //     return pool.query(queryString)
// //     .then((data) => {
// //       return res.status(200).send(data.rows[0])
// //     })
// //     .catch((error) => {
// //       console.log(error, 'error in get product styles')
// //     })
// //     pool.end()
// //   },


// // getRelatedProducts:  (req, res) => {
// //   var product_id = req.params.product_id;
// //   var queryString = `SELECT json_agg(related_product_id)
// //   AS related
// //   FROM related
// //   WHERE related.current_product_id = ${product_id}`;
// //   return pool.query(queryString)
// //   .then((data) => {
// //     return res.status(200).send(data.rows[0].related)
// //   })
// //   .catch((error) => {
// //     console.log(error, 'error in get related product ')
// //   })
// //   pool.end()
// // },


// // // cart:  (req, res) => {
// // //   var product_id = req.params.product_id;
// // //   console.log(product_id)
// // //   console.log("++++++++++++++++++++++++++++++++++++++++++++++", req.params.product_id)
// // //   var queryString = `SELECT json_agg(
// // //     related_product_id
// // //   )
// // //   FROM related
// // //   WHERE related.current_product_id = ${product_id}`;
// // //   return pool.query(queryString)
// // //   .then((data) => {
// // //     return res.status(200).send(data.rows[0])
// // //   })
// // //   .catch((error) => {
// // //     console.log(error, 'error in get  product cart')
// // //   })
// // //   pool.end()
// // // }
// // }

// DROP DATABASE IF EXISTS products;

// CREATE DATABASE products;

// \c products;

// DROP TABLE IF EXISTS product, features, styles, related, photos, skus, cart CASCADE;

// CREATE TABLE product (
//   id SERIAL UNIQUE NOT NULL,
//   name VARCHAR(50) NOT NULL,
//   slogan VARCHAR(300) NOT NULL,
//   description VARCHAR(500) NOT NULL,
//   category VARCHAR(50) NOT NULL,
//   default_price VARCHAR(50) NOT NULL,
//   PRIMARY KEY (id)
// );

// CREATE TABLE features (
//   id SERIAL UNIQUE NOT NULL,
//   product_id INTEGER NOT NULL,
//   feature VARCHAR(50) NOT NULL,
//   value VARCHAR(50) NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (product_id) REFERENCES product(id)
// );

// CREATE TABLE styles (
//   id SERIAL UNIQUE NOT NULL,
//   productId INTEGER NOT NULL,
//   name VARCHAR(50) NOT NULL,
//   sale_price VARCHAR(50),
//   original_price VARCHAR(50) NOT NULL,
//   default_style BOOLEAN NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (productId) REFERENCES product(id)
// );

// CREATE TABLE related (
//   id SERIAL UNIQUE NOT NULL,
//   current_product_id INTEGER NOT NULL,
//   related_product_id INTEGER NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (current_product_id) REFERENCES product(id)
// );

// CREATE TABLE photos (
//   id SERIAL  UNIQUE NOT NULL,
//   styleId INTEGER NOT NULL,
//   url VARCHAR(300) NOT NULL,
//   thumbnail_url TEXT NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (styleId) REFERENCES styles(id)
// );

// CREATE TABLE skus (
//   id SERIAL UNIQUE NOT NULL,
//   styleId INTEGER NOT NULL,
//   size VARCHAR(20) NOT NULL,
//   quantity INTEGER NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (styleId) REFERENCES styles(id)
// );

// CREATE TABLE cart (
//   id SERIAL NOT NULL,
//   user_session INTEGER NOT NULL,
//   product_id INTEGER NOT NULL,
//   active INTEGER NOT NULL,
//   PRIMARY KEY (id),
//   FOREIGN KEY (product_id) REFERENCES product(id)
// );


// \COPY product FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/product.csv' WITH (FORMAT CSV, HEADER);
// \COPY features FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/features.csv' WITH (FORMAT CSV, HEADER);
// \COPY styles FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/styles.csv' WITH (FORMAT CSV, HEADER);
// \COPY related FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/related.csv' WITH (FORMAT CSV, HEADER);
// \COPY photos FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/photos.csv' WITH (FORMAT CSV, HEADER);
// \COPY skus FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/skus.csv' WITH (FORMAT CSV, HEADER);
// \COPY cart FROM '/Users/david.arredondo/Precourse/SDC Products/Products/database/CSVdata/cart.csv' WITH (FORMAT CSV, HEADER);
