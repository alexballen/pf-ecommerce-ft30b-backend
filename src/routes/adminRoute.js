const { Router } = require('express')
const {toggleProductAsFeatured, toggleAdmin, toggleBan, expansionSending, getZones} = require('../controllers/adminController')


const adminRoute = Router()

adminRoute.post('/featured/:productId', toggleProductAsFeatured)
adminRoute.put('/getBan', toggleBan)
adminRoute.put('/getAdmin', toggleAdmin)
adminRoute.post('/zones', expansionSending)
adminRoute.get('/zones', getZones)

module.exports = adminRoute
