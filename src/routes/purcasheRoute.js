const { Router } = require('express')
const {addProductToCart, getCart} = require('../controllers/purcasheController')

const purcasheRoute = Router()

purcasheRoute.get('/cart', getCart)
purcasheRoute.post('/addToCart', addProductToCart)



module.exports = purcasheRoute