const { Router } = require('express')
const { createNewUser, loginUser, toggleBan, toggleAdmin, updateUserData } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.post('/register', createNewUser)
userRoute.post('/login', loginUser)
userRoute.put('/getBan', toggleBan)
userRoute.put('/getAdmin', toggleAdmin)
userRoute.put('/userData/:userId', updateUserData )

module.exports = userRoute