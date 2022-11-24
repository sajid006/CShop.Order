const services = require('../services/cartServices');
const catchAsync = require('../utils/catchAsync');

exports.checkCartExistence = catchAsync(async (req, res, next) => {
  const value = req.params.id;
  const noOfCart = await services.checkCartId(value);
  if (noOfCart < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
});

exports.checkPostBody = (req, res, next) => {
  if (!req.body.userid) {
    return res.status(400).json({
      status: 'fail',
      message: 'User id missing',
    });
  }
  next();
};

exports.checkUpdateBody = (req, res, next) => {
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
  next();
};
