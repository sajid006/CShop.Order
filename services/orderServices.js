const orderModel = require('../models/orderModel');
exports.createOrder = async (orderData) => {
  const { username, products, amounts, cost } = orderData;
  const count = await orderModel.countDocuments();
  const newOrder = new orderModel();
  newOrder.id = count + 1;
  newOrder.username = username;
  newOrder.products = products;
  newOrder.amounts = amounts;
  newOrder.cost = cost;
  newOrder.save(function (err) {
    if (err) return err;
  });
  return newOrder;
};

exports.findAllOrders = async () => {
  return await orderModel.find();
};

exports.findOneOrder = async (id) => {
  return await orderModel.findOne({ id: id });
};

exports.findUserOrders = async (username) => {
  return await orderModel.find({ username: username });
};

exports.updateOrder = async (orderData) => {
  const { id, username, products, amounts, cost } = orderData;
  await orderModel.findOneAndUpdate(
    { id: id },
    { username: username, products: products, amounts: amounts, cost: cost }
  );
  return await orderModel.findOne({ id: id });
};

exports.removeOrder = async (id) => {
  await orderModel.findOneAndRemove({ id: id });
};

exports.checkOrderId = async (id) => {
  const count = await orderModel.countDocuments({ id: id });
  return count;
};
