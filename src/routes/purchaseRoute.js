const { Router } = require('express')
const {addProductToCart, getCart, removeFromCart, deleteAllCart, buyproduct} = require('../controllers/purchaseController')

const storeRoute = Router()

storeRoute.get('/cart', getCart)
storeRoute.post('/add', addProductToCart)
storeRoute.post('/remove', removeFromCart)
storeRoute.delete('/clean', deleteAllCart)
storeRoute.post('/:id', buyproduct)



module.exports = storeRoute