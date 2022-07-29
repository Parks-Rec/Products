var router = require('express').Router()
var controller = require('./controllers.js')

router.get('/products', controller.getAllProducts);

// router.get('/products/:product_id', controller.getProductByID);

// router.get('/products/:product_id/styles', controller.getProductStyles);

// router.get('/products/:product_id/related', controller.getRelatedProducts);

module.exports = router;