const { Router } = require('express')
const {toggleProductAsFeatured} = require('../controllers/adminController')


const adminRoute = Router()

adminRoute.post('/featured/.productId', toggleProductAsFeatured)

module.exports = adminRoute