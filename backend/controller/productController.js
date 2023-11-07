const Product = require('../model/productModel');
const { v4: uuidv4 } = require('uuid');

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await Product.getAll();

    if (products) {
      res.status(200).json({
        status: 200,
        data: products,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: 'No Products Found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

exports.createProduct = async (req, res) => {
  const { name, description, price, category_id, image_path } = req.body;
  try {
    const product = new Product({
      product_id: uuidv4(), 
      seller_id: "dce5015d-838c-4961-abb0-9ebeccd73e4c", 
      name, 
      description, 
      price, 
      category_id, 
      image_path,
      created_at: new Date(),
    });
    const [result] = await Product.create(product);
    if (result.affectedRows) {
      res.status(200).json({
        status: 200,
        name: name,
        message: 'Product Created Successfully',
      });
    } else {
      res.status(200).json({
        status: 200,
        message: 'Product Creation Failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}