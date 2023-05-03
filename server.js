const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const productController = require('./controllers/productController');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/products', productController.listProducts);
app.post('/createProduct', productController.createProduct);
app.post('/uploadImage/', upload.single('image'), productController.uploadImage);
app.delete('/deleteImage/:productId/:imageId', productController.deleteImage);
app.put('/editProduct/:productId', productController.editProduct);
app.delete('/deleteProduct/:productId', productController.deleteProduct);
app.get('/test', productController.test);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
