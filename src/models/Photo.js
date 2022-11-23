const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('photo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        url: {
            type: DataTypes.TEXT

        }
    }, {
        timestamp: false,
        createdAt: false,
        updatedAt: false,
    })
}