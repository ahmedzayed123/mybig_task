const productModel = require('../models/product');

exports.listProducts = async (req, res) => {
  
  try {
    const products = await productModel.product.list();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await productModel.product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { productId } = req.body;
    const fileData = req.file.buffer;
    const image = await productModel.productImage.create(productId, {
      attachment: fileData.toString('base64'),
      filename: req.file.originalname
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;
    await productModel.productImage.delete(productId, imageId);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;
    const updatedProduct = await productModel.product.update(productId, updatedProductData);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  
   try {
    const { productId } = req.params;
    await productModel.product.delete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

exports.test = async (req, res) => {
  
 
   res.status(200).json({ message: 'Product deleted successfully' });
 

};
