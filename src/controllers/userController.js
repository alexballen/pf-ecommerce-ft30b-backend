const { User, Review, Cart, Photo, conn } = require('../db.js')
const {Op} = require('sequelize')

const { User, City, Photo, conn, Favorite, Product, Brand } = require('../db.js')
const { Op } = require('sequelize')


async function createNewUser(user)
{

    let {
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
        await newUser.createFavorite()
        await newUser.createCompra()
        await newUser.createPhoto({ url: picture, transaction })
        await transaction.commit()
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}



const userLogin = async (req, res, next) =>
{
    
    const { email } = req.body

    try
    {

        const Us = await User.findOne({
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
    let { firstName, lastName, email, password, username, phoneNumber, country, city, gender } = req.body

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
            gender
        })

        if (country !== '' || country !== null || country !== undefined) {
            const userCountry = await Country.findOne({
                where: {
                    name: country
                },
                include: City
            }) 
            await updatedUser.setCountry(userCountry)
            if (city !== '' || city !== null || city !== undefined) {
                await userCountry.cities.forEach(c => {
                    if (c.name === city) {
                        return updatedUser.setCity(c)
                    }
                })
            }
        }

        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}

const completeSignUp = async (req, res) =>
{
    let { userId } = req.params
    let { phoneNumber, cityId } = req.body
    const transaction = await conn.transaction();

    try
    {
        let user = await User.findOne({
            where: { id: userId },

        });

        let city = await City.findOne({
            where: {
                id: cityId
            }
        })

        const updatedUser = await user.update({
            phoneNumber
        }, { transaction })

        await user.setCityOfOrigin(city, { transaction });

        await transaction.commit();

        res.status(200).send(updatedUser)
    } catch (error)
    {
        await transaction.rollback();
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}

async function deleteUser(req, res)
{
    const { userId } = req.params

    try {
        const userToDelete = await User.findOne({
            where: {
                id: userId
            }
        })
        
        if(!userToDelete) {
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


module.exports = {
    createNewUser,
    loginUser,
    updateUserData,
    deleteUser,
    getUsers,
    userSoftDelete,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    completeSignUp

}
