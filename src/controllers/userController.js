const { User, Review, Cart, Photo, conn } = require('../db.js')
const {Op} = require('sequelize')

async function createNewUser(user) {

    let {
        email,
        nickname,
        picture
    } = user
    const transaction = await conn.transaction()
    try {
        let newUser = await User.create({
            email:email,
            username:nickname,
        })
        
        

        await newUser.createCart()
        await newUser.createPhoto({ url: picture, transaction })
        await transaction.commit()


        const Us = await User.findOne({where: {
            id:newUser.id,  
        },
        include: { all: true, nested: true }
        }
        )

        
        return Us
    } catch (error) {
        return error
    }
}


const userLogin = async (req, res, next) => {
    console.log("This is the body:", req.body)
    const {email}=req.body
   
    try {
      
        const Us = await User.findOne({where: {
                    email:email,  
                },
                include: { all: true, nested: true }
                }
                )

        if(!Us){
            const response = await createNewUser(req.body)
       
            res.status(200).send({
                msg:"Usuario creado exitosamente",
                data: await response        
            })
        } else if (Us.isBan === true){
            res.status(403).send({msg: "Usuario blockeado"})
        }
        else{res.status(200).send({data:Us})}

    } catch (error) {
        console.log(error)
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
        const allUsers = User.findAll({ include: { all: true, nested: true } })

        allUsers.length === 0 ? (
            res.status(200).json({
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
    userLogin,
    updateUserData,
    deleteUser,
    getUsers
}
