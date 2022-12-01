const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('city', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        }
    },
    {
            timestamp: false,
            createdAt: false,
            updatedAt: false
    }
    )
}
