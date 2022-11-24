const services = require('../services/cartServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const allCarts = await services.findAllCarts();
  contentNegotiation.sendResponse(req, res, allCarts);
});
/*
exports.getUserCarts = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userCarts = await services.findUserCarts(id);
  contentNegotiation.sendResponse(req, res, userCarts);
});

exports.getSearchedCarts = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userCarts = await services.findSearchedCarts(id);
  contentNegotiation.sendResponse(req, res, userCarts);
});
*/
exports.getCart = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const myCart = await services.findOneCart(id);
  contentNegotiation.sendResponse(req, res, myCart);
});

exports.postCart = catchAsync(async (req, res, next) => {
  const cartData = {
    userid: req.body.userid,
    products: [],
    amounts: [],
  };
  if (req.body.products) {
    cartData.products = req.body.products;
  }
  if (req.body.amounts) {
    cartData.amounts = req.body.amounts;
  }
  //check if all the products has amount greater than or equal to the given cart
  // If not, send error message ' only x pieces of this product is available'
  const newCart = await services.createCart(cartData);
  // Update the product service by reducing amount of each product
  contentNegotiation.sendResponse(req, res, newCart, 201);
});

exports.patchCart = catchAsync(async (req, res, next) => {
  const cartData = {
    userid: req.params.id,
    products: req.body.products,
    amounts: req.body.amounts,
  };
  const myCart = await services.updateCart(cartData);
  contentNegotiation.sendResponse(req, res, myCart);
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const userid = req.params.id;
  await services.removeCart(userid);
  res.status(204).json({});
});
