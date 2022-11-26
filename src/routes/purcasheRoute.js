const { Router } = require('express')
const {addProductToCart, getCart, removeFromCart, deleteAllCart} = require('../controllers/purcasheController')

const purcasheRoute = Router()

purcasheRoute.get('/cart', getCart)
purcasheRoute.post('/add', addProductToCart)
purcasheRoute.post('/remove', removeFromCart)
purcasheRoute.delete('/clean', deleteAllCart)



module.exports = purcasheRoute