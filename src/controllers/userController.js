
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



const userLogin = async (req, res, next) => {
    const {name, picture }=req.body
    // console.log(req.body)
    try {
        const { email } = req.params

        const Us = await User.findOne({where: {
            [Op.or]: [
                {
                    email,
                },
                {
                    username: email,
                }]}})

        if(!Us){
            const User = {
                fullName: name,
                email: email,
                image: picture,
                active: true,
                isAdmin: false,
            }
            const response = await User.create(User)

            const cart = await CreateCart(response._id)
            console.log('create carrito: '+ cart)

            await EmeilerConfig(User.email, User.fullName)
            
            res.status(200).send({
                msg:"User created succesfully",
                data:User,
                db_response: response        
            })
        } else if (Us.active === false){
            res.status(403).send({msg: "User Blocked"})
        }
        else{res.status(200).send(Us)}

    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })

    }
    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
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

        const queryPhoto = await Photo.findOne({
            where: {
                userId: userId
            }
        })
        
        if(!userToDelete || userToDelete.length === 0) {
            return res.status(404).json({msg: '¡Dejad al usuario tranquilo!'})
        } else {
            userToDelete.destroy()
            queryPhoto.destroy()
            return res.status(200).json({msg: '¡Avada kedabra!..... Oops!'})
        }

    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
  
}

async function userSoftDelete(req, res) {
  const { userId } = req.params;
  const { restore } = req.query;

  try {
    if (restore) {
      await User.restore({
        where: {
          id: userId,
        },
      });
      return res.status(200).json({ msg: "Usuario devuelta en el mapa!" });
    }
    const userSoftDelete = User.findOne({
      where: {
        id: userId,
      },
    });
    if (!userSoftDelete) {
      return res
        .status(404)
        .json({
          msg: "No hay usuario que coincida con esos valores, chequear Id enviado",
        });
    } else {
      User.destroy({
        where: {
          id: userId,
        },
      });
      return res.status(200).json({ msg: "Usuario escondido con exito!" });
    }
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
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
    userLogin,
    toggleBan,
    toggleAdmin,
    updateUserData,
    deleteUser,
    getUsers,
    userSoftDelete,
}
