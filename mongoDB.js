const mongoose = require("mongoose")

const products = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      features: String,
      value: String
    }

  ],
  related_products:[Number]
  });

  const productStyles = new mongoose.Schema({
    product_id: Number,
    results:  [
      {
        style_id: Number,
        name: String,
        original_price: String,
        sale_price: String,
        "default?": Boolean,
        photos: [
          {
            thumbnail_url: String,
            url: String
          },
                ],
        skus: {
          sku_Num: {
            quantity: Number,
            size: String
          }
        }
      }
    ]
  });