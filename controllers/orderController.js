const services = require('../services/orderServices');
const catchAsync = require('../utils/catchAsync');
const contentNegotiation = require('../utils/contentNegotiation');
const axios = require('axios');
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
    userid: req.body.userid,
    products: req.body.products,
    amounts: req.body.amounts,
    cost: req.body.cost,
  };
  const remAmount = [];
  for (let i = 0; i < orderData.products.length; i++) {
    const productid = orderData.products[i];
    const amount = orderData.amounts[i];
    try {
      const response = await axios.get(`https://cshopapigateway.azurewebsites.net/api/product/${productid}`);
      const productCount = response.data.stock * 1;
      if (productCount < amount) {
        const errResponse = `Only ${productCount} pieces of product ${response.data.name} is available`;
        contentNegotiation.sendResponse(req, res, errResponse, 400);
      }
      const updatedProduct = {
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
        stock: productCount - amount,
      };
      remAmount.push(updatedProduct);
    } catch {
      const errResponse = `Product no ${productid} is unavailable`;
      contentNegotiation.sendResponse(req, res, errResponse, 400);
    }
  }
  const newOrder = await services.createOrder(orderData);
  // Update the product service by reducing amount of each product
  console.log('DONE');
  const config = {
    headers: {
      Authorization: req.headers.authorization,
    },
  };
  for (let i = 0; i < orderData.products.length; i++) {
    const productid = orderData.products[i];
    const url = `https://cshopapigateway.azurewebsites.net/api/product/${productid}`;
    try {
      const response = await axios.put(url, remAmount[i], config);
      console.log(response.data);
    } catch (err) {
      contentNegotiation.sendResponse(req, res, err, 400);
    }
  }
  contentNegotiation.sendResponse(req, res, newOrder, 201);
});

exports.patchOrder = catchAsync(async (req, res, next) => {
  const orderData = {
    id: req.params.id,
    userid: req.body.userid,
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
