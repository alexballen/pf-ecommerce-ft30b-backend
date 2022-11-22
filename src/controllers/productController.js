const { Product, Brand, Category, Photo } = require('../db.js')





const  getAllProducts = async(req, res) => {
    try {
        const queryProducts = await Product.findAll({
            include: [Brand, Category, Photo]
        })
        if (queryProducts.length === 0) {
           return res.status(404).json({
                msg: 'No products in the database yet'
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
            include: [Brand, Category, Photo]
        })
        let productPics = await Photo.create({
            url: pics
        })

       await newProduct.addPhotos(productPics)
        let [queryBrand, created] = await Brand.findOrCreate({
            where: {
                name: productBrand
            },
            defaults: {
                name: productBrand
            }
        })

        

       await newProduct.setBrand(queryBrand)

        let [queryCategory, createdCat] = await Category.findOrCreate({
            where: {
                name: category
            },
            defaults: {
                name: category
            }
        }) 

        const readyProduct = await newProduct.addCategories(queryCategory)

        
        

        res.status(201).send(readyProduct)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later',
            description: error
        })
    }
}

const getCategories = async (req, res) => {
    try {
        let allCategories = await Category.findAll()
        if (allCategories.length === 0 || !allCategories) {
            return res.status(404).json({
                msg: 'No categories in database'
            })
        }
        res.status(200).send(allCategories)
    } catch (error) {
         res.status(500).json({
             err: 'Something went wrong please try again later',
             description: error
         })
    }
}


const getBrands = async (req, res) => {
    try {
        let allBrands = await Brand.findAll()
        if (allBrands.length === 0 || !allBrands) {
            return res.status(404).json({
                msg: 'No brands in database'
            })
        }
        res.status(200).send(allBrands)
    } catch (error) {
        res.status(500).json({
            err: 'Something went wrong please try again later',
            description: error
        })
    }
}




module.exports = {
    getAllProducts,
    createNewProduct,
    getCategories,
    getBrands
}
