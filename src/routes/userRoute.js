const { Router } = require('express')
const { createNewUser, loginUser } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.post('/register', createNewUser)
userRoute.post('/login', loginUser)

module.exports = userRoute