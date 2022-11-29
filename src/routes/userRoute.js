const { Router } = require('express')
const { createNewUser, userLogin, updateUserData, deleteUser, getUsers } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.get('/', getUsers)
userRoute.post('/register', createNewUser)
userRoute.post('/login', userLogin)
userRoute.put('/userData/:userId', updateUserData )
userRoute.delete('/delete/:userId', deleteUser)

module.exports = userRoute