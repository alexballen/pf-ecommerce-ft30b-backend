const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("country", {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
        }
    },
        {
            timestamp: false,
            createdAt: false,
            updatedAt: false
    })
}