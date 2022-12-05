const { Router } = require("express");
const {
  addProductToCart,
  getCart,
  removeFromCart,
  deleteAllCart,
  buyproduct,
  buyall,
  getpayinfo,
  updatecart,
} = require("../controllers/purchaseController");

const storeRoute = Router();

storeRoute.get("/cart", getCart);
storeRoute.post("/add", addProductToCart);
storeRoute.post("/remove", removeFromCart);
storeRoute.post("/buyall", buyall);
storeRoute.post("/clean", deleteAllCart);
storeRoute.post("/payments", getpayinfo);
storeRoute.post("/:id", buyproduct);
storeRoute.put("/update", updatecart);

module.exports = storeRoute;
