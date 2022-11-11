const services = require('../services/orderServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const allOrders = await services.findAllOrders();
  contentNegotiation.sendResponse(req, res, allOrders);
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userOrders = await services.findUserOrders(id);
  contentNegotiation.sendResponse(req, res, userOrders);
});
/*
exports.getSearchedOrders = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userOrders = await services.findSearchedOrders(id);
  contentNegotiation.sendResponse(req, res, userOrders);
});


*/
exports.getOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const myOrder = await services.findOneOrder(id);
  contentNegotiation.sendResponse(req, res, myOrder);
});

exports.postOrder = catchAsync(async (req, res, next) => {
  const orderData = {
    username: req.body.username,
    products: req.body.products,
    amounts: req.body.amounts,
    cost: req.body.cost,
  };
  const newOrder = await services.createOrder(orderData);
  contentNegotiation.sendResponse(req, res, newOrder, 201);
});

exports.patchOrder = catchAsync(async (req, res, next) => {
  const orderData = {
    username: req.body.username,
    products: req.body.products,
    amounts: req.body.amounts,
    cost: req.body.cost,
  };
  const myOrder = await services.updateOrder(orderData);
  contentNegotiation.sendResponse(req, res, myOrder);
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await services.removeOrder(id);
  res.status(204).json({});
});
