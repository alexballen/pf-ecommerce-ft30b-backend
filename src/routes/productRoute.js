const { Router } = require('express')
const {getAllProducts, createNewProduct, getCategories, getBrands} = require('../controllers/productController.js')


const productRoute = Router()


productRoute.get('/', getAllProducts)
productRoute.post('/', createNewProduct)
productRoute.get('/brands', getBrands)
productRoute.get('/categories', getCategories)

module.exports = productRoute