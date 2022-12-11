const { Cart, User, Product, Compra } = require("../db");
const mercadopago = require("mercadopago");
   

const addProductToCart = async (req, res) => {
  let { userId, productId, qty } = req.body;
  try {
    const userCart = await Cart.findOne({
      where: {
        userId,
      },
      include: Product,
    });
    const queryProduct = await Product.findOne({
      where: {
        id: productId,
      },
    });

    userCart.products.forEach((p) => {
      return async function () {
        if (p.id === productId) {
          await userCart.removeProducts(queryProduct);
        }
      };
    });

    queryProduct.quantity = qty * 1;
    await queryProduct.save();
    await userCart.addProduct(queryProduct);

    res.status(200).json({
      msg: "Articulo agregado al carrito correctamente, ¡Genial! ¡Más consumismo!",
    });
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const crearhistorial = async (req, res) => {
  const {userId, preference_id
    ,status,collection_id,collection_status,
    payment_type,merchant_order_id} = req.body;
  try {
 
    const usuario = await User.findOne({
      where: {
        id :userId
      },
 
    });

    // const compra = await Compra.create( {
    // userId:userId,
    // preferenceid: preference_id,
    // collectionid: collection_id,
    // merchantorderid:merchant_order_id,
    // status:status,
    // paymenttype:payment_type,
    // collectionstatus: collection_status,

    // } )

   const compra =  await usuario.createCompra( { 
        preferenceid: preference_id,
        collectionid: collection_id,
        merchantorderid:merchant_order_id,
        status:status,
        paymenttype:payment_type,
        collectionstatus: collection_status,
       }
     )  
     
    
 

 
    res.status(200).json(compra);

  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const getCart = async (req, res) => {
  let { userId } = req.query;

  try {
    const userCart = await Cart.findOrCreate({
      where: {
        userId: userId,
      },
      include: Product,
    });
    res.status(200).send(userCart);
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const queryCart = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: Product,
    });

    const queryProuct = await Product.findOne({ where: { id: productId } });

    await queryCart.removeProduct(queryProuct);
    res
      .status(200)
      .json({ msg: "Articulo removido del carrito, si no puedes pagarlo..." });
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const buyproduct = async (req, res) => {
  const { id } = req.params;
  const { quantity, userId } = req.body;

  try {
    const product = await Product.findByPk(id,{include : {all : true}});
    if (product.length === 0) {
      return res.status(404).json({
        msg: "No se encontró el producto que estas buscando... seguramente era una capa",
      });
    }
 
    const user = await User.findOne({
      where: {
        id: userId,
      },
 
    });
 
    // product.stock = product.stock - quantity
    // await product.save()
    // const queryCart = await Cart.findOne({
    //   where: {
    //     userId: userId
    //   },
    //   include: Product
    // })

    // queryCart.removeProduct(product);

    let preference = {
      payer: {
        email: user.email,
        name: user.username,
        // address:
        // {
        //   street_name : user.street ,
        //   zip_code: user.zipCode , street_number: null
        // }
        // // identification: 
        // {
        //    number: '', type: '' 
        //   },
        // // phone: 
        //   {
        //    number: user.phoneNumber 
        //   },
      },
   // shipments: {
      //   receiver_address: {
      //     zip_code: user.zipCode, //string
      //     street_name: user.street, //string
      //     street_number: user.street, //numero
      //     floor: user.houseNumber, //string
      //     apartment: user.houseNumber, //string
      //     city_name: user.city, //string
      //     state_name: user.neighborhood, //string
      //     country_name: user.country //string
    
      //   }},
  
      items: [
      
        {
          id: product.id,
          title: product.name,
          unit_price: product.unitPrice,
          quantity: parseInt(quantity) ,
          picture_url: product.photos[0].url,

        },

      ],
  
      back_urls: {
        success: `https://localhost:3000/itempayments`,
        failure: `https://localhost:3000/paymentsfail`,
        pending: `https://localhost:3000/paymentspending`,
      },
      auto_return: "approved",
      // notification_url: `http://localhost:3001/store/payments/`,
      external_reference: "H-COMERSEHENRY",
    };
  

  mercadopago.preferences.create(preference).then( async function (response) {   
  res.status(200).json(response.body);
   
    
      
    }); 


  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const getpayinfo = async (req, res) => {
  try {



    res.status(200).json(req.body);

    // await Compra.findOrCreate({


    // })

  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const buyall = async (req, res) => {
  const { Cartitems ,userId} = req.body;

  try {
 
   
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Cart,
    });

    var preference = {
      items: [],
      payer: {
        email: user.email,
        name: user.username,
    // address:
        // {
        //   street_name : user.street ,
        //   zip_code: user.zipCode , street_number: null
        // }
        // // identification: 
        // {
        //    number: '', type: '' 
        //   },
        // // phone: 
        //   {
        //    number: user.phoneNumber 
        //   },
      },
      // shipments: {
         //   receiver_address: {
         //     zip_code: user.zipCode, //string
         //     street_name: user.street, //string
         //     street_number: user.street, //numero
         //     floor: user.houseNumber, //string
         //     apartment: user.houseNumber, //string
         //     city_name: user.city, //string
         //     state_name: user.neighborhood, //string
         //     country_name: user.country //string
       
         //   }},
      back_urls: {
        success: `https://localhost:3000/cartpayments`,
        failure: `https://localhost:3000/paymentsfail`,
        pending: `https://localhost:3000/paymentspending}`,
      },
      auto_return: "approved",
      // notification_url: `http://localhost:3001/store/payments`,
      external_reference: "H-COMERSEHENRY",
    };

    for (let e of Cartitems) {
      preference.items.push({
        id: e.id,
        title: e.name,
        unit_price: e.unitPrice,
        quantity: parseInt(e.quantity),
        picture_url: e.photos[0].url,
      });
    }
    
    // Cartitems.forEach( async product => {
    //     const queryProduct = await Product.findOne({
    //         where: {
    //             id: product.id
    //         }
    //     })
    //     queryProduct.stock = queryProduct.stock - product.quantity
    //     await queryProduct.save()
    // }) 

    mercadopago.preferences.create(preference).then(function (response) {
      res.status(200).json(response.body);
      
  
    });
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

const deleteAllCart = async (req, res) => {
  let { userId } = req.body;
  try {
    const queryCart = await User.findOne({
      where: {
        id: userId,
      },
      include: Cart,
    });

    await queryCart.setCart(null);
    await queryCart.createCart();
    res.status(200).json({
      msg: "El carrito se vació por completo, parece que no soportó el estilo Neutrón",
    });
  } catch (error) {
    res.status(500).json({
      err: "Algo salió terriblemente mal, estamos trabajando en ello",
      description: error,
    });
  }
};

module.exports = {

  addProductToCart,
  getCart,
  removeFromCart,
  deleteAllCart,
  buyproduct,
  buyall,
  getpayinfo,
  crearhistorial,
};

