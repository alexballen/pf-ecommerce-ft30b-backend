const { Router } = require('express')
const { createNewUser, updateUserData, deleteUser, userSoftDelete, getUsers, userLogin } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.get('/', getUsers)
userRoute.post('/register', createNewUser)
userRoute.post('/login/:email', userLogin)
userRoute.put('/userData/:userId', updateUserData )
userRoute.delete('/delete/:userId', deleteUser)
userRoute.delete('/softDelete/:userId', userSoftDelete)

module.exports = userRoute