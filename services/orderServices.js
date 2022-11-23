const orderModel = require('../models/orderModel');
exports.createOrder = async (orderData) => {
  const { userid, products, amounts, cost } = orderData;
  const count = await orderModel.countDocuments();
  const newOrder = new orderModel();
  newOrder.id = count + 1;
  newOrder.userid = userid;
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

exports.findUserOrders = async (userid) => {
  return await orderModel.find({ userid: userid });
};

exports.updateOrder = async (orderData) => {
  const { id, userid, products, amounts, cost } = orderData;
  await orderModel.findOneAndUpdate({ id: id }, { userid: userid, products: products, amounts: amounts, cost: cost });
  return await orderModel.findOne({ id: id });
};

exports.removeOrder = async (id) => {
  await orderModel.findOneAndRemove({ id: id });
};

exports.checkOrderId = async (id) => {
  const count = await orderModel.countDocuments({ id: id });
  return count;
};
