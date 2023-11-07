const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');


router.route('/get').get(productController.getAllProducts);
router.route('/add').post(productController.createProduct);

module.exports = router;