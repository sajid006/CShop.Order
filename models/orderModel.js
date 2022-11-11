const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
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
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema, 'Orders');
