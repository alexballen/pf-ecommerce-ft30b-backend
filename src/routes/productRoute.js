const { Router } = require('express')
const {getAllProducts, createNewProduct} = require('../controllers/productController.js')


const productRoute = Router()


productRoute.get('/', getAllProducts)
productRoute.post('/', createNewProduct)

module.exports = productRoute