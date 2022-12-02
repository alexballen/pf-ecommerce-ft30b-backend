const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'compra',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true
            },
           
        },
        {
            timestamp: true,
            createdAt: 'fechaDeCompra',
            updatedAt: false
        }
    )
}