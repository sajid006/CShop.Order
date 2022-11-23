const cartModel = require('../models/cartModel');
exports.createCart = async (cartData) => {
  const { userid, products, amounts } = cartData;
  const newOrder = new cartModel();
  newOrder.userid = userid;
  newOrder.products = products;
  newOrder.amounts = amounts;
  newOrder.save(function (err) {
    if (err) return err;
  });
  return newOrder;
};

exports.findAllCarts = async () => {
  return await cartModel.find();
};

exports.findOneCart = async (userid) => {
  return await cartModel.findOne({ userid: userid });
};

exports.updateCart = async (cartData) => {
  const { userid, products, amounts } = cartData;
  await cartModel.findOneAndUpdate({ userid: userid }, { products: products, amounts: amounts });
  return await cartModel.findOne({ userid: userid });
};

exports.removeCart = async (userid) => {
  await cartModel.findOneAndRemove({ userid: userid });
};

exports.checkCartId = async (userid) => {
  const count = await cartModel.countDocuments({ userid: userid });
  return count;
};
