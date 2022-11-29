const { Router } = require('express')
const { removeFromCart } = require('../controllers/purchaseControluserLer.js')
const { createNew, updateUserData, deleteUser, getUsers, getUsers, loginUser, addToFavorites, removeFromFavorites } = require('../controllers/userController.js')



const userRoute = Router()
userRoute.get('/', getUsers)
userRoute.post('/register', createNewUser)
userRoute.post('/login', userLogin)
userRoute.put('/userData/:userId', updateUserData )
userRoute.delete('/delete/:userId', deleteUser)
userRoute.delete('/softDelete/:userId', userSoftDelete)
userRoute.post('/favorites', addToFavorites)
userRoute.delete('/removeFromFavorites', removeFromFavorites)


module.exports = userRoute