const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'compra',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            preference_id: {
                type: DataTypes.STRING,  
                allowNull: false,
            
            },
            collection_id: {
                type: DataTypes.STRING,
                allowNull: false,
              
            },
            merchant_order_id: {
                type: DataTypes.STRING,
                allowNull: false,
      
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
       
            },
            payment_type: {
                type: DataTypes.STRING,
                allowNull: true,
          
            },
            collection_status: {
                type: DataTypes.STRING,
                allowNull: true,
          
            },
            },
        {
            timestamp: true,
            createdAt: 'fechaDeCompra',
            updatedAt: false
        }
    )
}
