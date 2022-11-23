const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userid: {
      type: Number,
      required: true,
    },
    products: {
      type: [Number],
      required: true,
    },
    amounts: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('cart', cartSchema, 'Carts');
