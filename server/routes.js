var express = require('express')
var router = express.Router()
var controller = require('./controllers.js')




router.get('/products', controller.getAllProducts)

router.get('/products/:product_id', controller.getProductByID);

router.get('/products/:product_id/styles', controller.getProductStyles);

router.get('/products/:product_id/related', controller.getRelatedProducts);

// router.get('/products/:product_id/related', controller.cart);

module.exports = router;