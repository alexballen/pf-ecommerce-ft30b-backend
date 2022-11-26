const { Product } = require('../db')


async function toggleProductAsFeatured(req, res) {
    let { productId } = req.params
    try {
        const queryProduct = await Product.findByPk(productId)
        queryProduct.isFeatured = !queryProduct.isFeatured
        await queryProduct.save()
        if (queryProduct.isFeatured === true) {
            return res.status(201).json({
                msg: '¡Llevelo! ¡llevelo!, que el producto ahora es de destacado y no va a durar'
            })
        } else {
            return res.status(201).json({
                msg: `Deshonor, deshonrado el producto, deshonor sobre su familia, deshonrada su vaca `
            })
        }
    } catch (error) {
        res.status(500).json({
            err: 'Algo salió terriblemente mal, estamos trabajando en ello',
            description: error
        })
    }
}

module.exports = {
    toggleProductAsFeatured
}