const services = require('../services/orderServices');
const catchAsync = require('../utils/catchAsync');

exports.checkOrderExistence = catchAsync(async (req, res, next) => {
  const value = req.params.id;
  const noOfOrder = await services.checkOrderId(value);
  if (noOfOrder < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
});

exports.checkBody = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username missing',
    });
  }
  if (!req.body.products) {
    return res.status(400).json({
      status: 'fail',
      message: 'Product list missing',
    });
  }
  if (!req.body.amounts) {
    return res.status(400).json({
      status: 'fail',
      message: 'Amount list missing',
    });
  }
  if (!req.body.cost) {
    return res.status(400).json({
      status: 'fail',
      message: 'Cost missing',
    });
  }
  next();
};
