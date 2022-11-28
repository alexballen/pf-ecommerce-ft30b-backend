const { User, Review, Cart, Photo, conn } = require('../db.js')
const {Op} = require('sequelize')

async function createNewUser(req, res) {
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        username,
        // country,
        // city,
        profileImage
    } = req.body
    const transaction = await conn.transaction()
    try {
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            username,
            // country,
            // city
        })
        
        

        await newUser.createCart()
        await newUser.createPhoto({ url: profileImage, transaction })
        await transaction.commit()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}


async function loginUser(req, res) {
    let { email, password } = req.body
    try {
        let userProfile = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email,
                        password
                    },
                    {
                        username: email,
                        password
                    }
                ]
            },
            include: {all: true, nested: true}
        })
        if (!userProfile || userProfile.length === 0) {
            return res.status(404).json({
                msg: 'No encontramos a nadie que se llame así, quizá exista, pero no está aquí'
            })
        }
        res.status(200).send(userProfile)
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}





async function updateUserData(req, res) {
    let { userId } = req.params
    let { firstName, lastName, email, password, username, phoneNumber } = req.body

    try {
        let queryUser = await User.findOne({
            where: {
                id: userId
            }
        })

        const updatedUser = await queryUser.update({
            firstName,
            lastName,
            email,
            password,
            username,
            phoneNumber,
            // country,
            // city,
        })

        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}

async function deleteUser(req, res) {
    const { userId } = req.params

    try {
        const userToDelete = await User.findOne({
            where: {
                id: userId
            }
        })
        
        if(!userToDelete || userToDelete.length === 0) {
            return res.status(404).json({msg: '¡Dejad al usuario tranquilo!'})
        } else {
            userToDelete.destroy()
            return res.status(200).json({msg: '¡Avada kedabra!..... Oops!'})
        }

    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}


const getUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll({ include: { all: true, nested: true } })

        allUsers.length === 0 ? (
            res.status(404).json({
                msg: 'Ningun usuario se ha registrado aún... tu pagina no es popular... ¿Quieres que llame a una llorambulancia?'
            })
        ): (
            res.status(200).send(allUsers)
        )
    } catch (error) {
         res.status(500).json({
             err: 'Algo salió terriblemente mal, estamos trabajando en ello',
             description: error
         })
    }
}

module.exports = {
    createNewUser,
    loginUser,
    updateUserData,
    deleteUser,
    getUsers
}
