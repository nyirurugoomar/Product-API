const router = require('express').Router();

const{ getProduct ,createProduct,updateProduct, deleteProduct } = require('./controllers/Product')


router.get('/Products',getProduct);
router.post('/Products',createProduct);
router.put('/Products/:productID',updateProduct)
router.delete('/Products/:productID',deleteProduct)

module.exports= router