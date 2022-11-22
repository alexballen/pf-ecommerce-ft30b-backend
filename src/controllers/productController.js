const { Product, Brand, Category } = require('../db.js')




const  getAllProducts = async(req, res) => {
    try {
        const queryProducts = await Product.findAll({
            include: [Brand, Category]
        })
        if (queryProducts.length === 0) {
           return res.status(404).json({
                msg: 'Any product is in the database yet'
            })
        }
        res.status(200).send(queryProducts)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later'
        })
    }
}


async function createNewProduct(req, res) {
    const { name, stock, unitPrice, productBrand, pics, category, description } = req.body
    
    try {
        const newProduct = await Product.create({
            name,
            stock,
            unitPrice,
            description,
            include: [Brand, Category]
        })
        
        let [queryBrand, created] = await Brand.findOrCreate({
            where: {
                name: productBrand
            },
            defaults: {
                name: productBrand
            }
        })

        

        const brandedProduct = await newProduct.setBrand(queryBrand)

        let [queryCategory, createdCat] = await Category.findOrCreate({
            where: {
                name: category
            },
            defaults: {
                name: category
            }
        }) 

        const readyProduct = await brandedProduct.addCategories(queryCategory)

        res.status(201).send(readyProduct)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later',
            description: error
        })
    }
}





module.exports = {
    getAllProducts,
    createNewProduct
}