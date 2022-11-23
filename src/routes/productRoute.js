const { Router } = require('express')
const {getAllProducts, createNewProduct, getCategories, getBrands, deleteProduct, updateProduct, addNewReview } = require('../controllers/productController.js')


const productRoute = Router()


productRoute.get('/', getAllProducts)
productRoute.post('/', createNewProduct)
productRoute.delete('/:id', deleteProduct )
productRoute.get('/brands', getBrands)
productRoute.get('/categories', getCategories)
productRoute.put('/update', updateProduct)
productRoute.post('/:productId/reviews', addNewReview)

module.exports = productRoute