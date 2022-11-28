const { Router } = require('express')
const { createNewUser, loginUser, updateUserData, deleteUser, userSoftDelete } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.get('/', getUsers)
userRoute.post('/register', createNewUser)
userRoute.post('/login/:email', userLogin)
userRoute.put('/getBan', toggleBan)
userRoute.put('/getAdmin', toggleAdmin)
userRoute.put('/userData/:userId', updateUserData )
userRoute.delete('/delete/:userId', deleteUser)
userRoute.delete('/softDelete/:userId', userSoftDelete)

module.exports = userRoute