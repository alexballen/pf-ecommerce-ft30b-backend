const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>
{
    sequelize.define('product_category', {
    }, {
        timestamp: false,
        createdAt: false,
        updatedAt: false,
    })
}