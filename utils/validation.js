const jwt = require('jsonwebtoken');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

const generateToken = (username) => {
  return jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '50d',
    }
  );
};

const decodeToken = (req, res) => {
  return { username: 'dummy', role: 0 };
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { username: decoded.username, role: decoded.role };
  } catch {
    return null;
  }
};

const verifyAdmin = catchAsync(async (req, res, next) => {
  const tokenData = decodeToken(req, res);
  if (tokenData == null) return next(new AppError('You are not authorized', 401));
  if (tokenData.role != 0) return next(new AppError('Only admins have the permission', 401));
  next();
});
const verifyUser = catchAsync(async (req, res, next) => {
  const tokenData = decodeToken(req, res);
  if (tokenData == null) return next(new AppError('You are not authorized', 401));
  if (tokenData.role == 1 && tokenData.username != req.body.username)
    return next(new AppError('You can not view orders of another user', 401));
  next();
});
module.exports = {
  generateToken,
  verifyAdmin,
  verifyUser,
};
