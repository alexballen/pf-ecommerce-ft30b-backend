const { User } = require('../db.js')
const {Op} = require('sequelize')

async function createNewUser(req, res) {
    let { firstName, lastName, email, phoneNumber, password, username } = req.body
    
    try {
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            username,
        })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later',
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
            }
        })
        if (!userProfile || userProfile.length === 0) {
            return res.status(404).json({
                msg: 'No user found with those credentials'
            })
        }
        res.status(200).send(userProfile)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later',
            description: error
        })
    }
}

module.exports = {
    createNewUser,
    loginUser
}
