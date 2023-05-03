const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);
router.post('/createProduct', productController.createProduct);
router.post('/uploadImage', productController.uploadImage);
router.delete('/deleteImage/:productId/:imageId', productController.deleteImage);
router.put('/editProduct/:productId', productController.editProduct);
router.delete('/deleteProduct/:productId', productController.deleteProduct);
router.get('/test',productController.test)
module.exports = router;