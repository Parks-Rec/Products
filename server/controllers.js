const getAllProducts = require("./models.js");



module.exports = {

  getAllProducts: (request,response) => {
    getAllProducts.getAllProducts()
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error, 'error in get all products')
    })
  }

}