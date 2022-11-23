const jwt = require('jsonwebtoken');
const AppError = require('./appError');
const catchAsync = require('./catchAsync');

const generateToken = (userid, role, exp) => {
  return jwt.sign(
    {
      userid,
      role,
      exp,
    },
    process.env.JWT_SECRET
  );
};
function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
const decodeToken = (req, res) => {
  //return { userid: 'dummy', role: 0 };
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
  try {
    //console.log('ydo');
    //const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'HS512' });
    const payload = parseJwt(token);
    //console.log(payload);
    //const newToken = generateToken(payload);
    const arr = [];
    for (const key in payload) {
      arr.push(payload[key]);
      //console.log(payload[key]);
    }
    //console.log(arr);
    //const newToken = generateToken(arr[0], arr[1], arr[2]);
    //if (token == newToken) console.log('matched');
    //else console.log('not matched');
    return { userid: arr[0], role: arr[1] };
  } catch (err) {
    //console.log(err);
    return null;
  }
};

const verifyAdmin = catchAsync(async (req, res, next) => {
  const tokenData = decodeToken(req, res);
  if (tokenData == null) return next(new AppError('You are not authorized admin', 401));
  if (tokenData.role == 'False') return next(new AppError('Only admins have the permission', 401));
  next();
});
const verifyUser = catchAsync(async (req, res, next) => {
  const tokenData = decodeToken(req, res);
  if (tokenData == null) return next(new AppError('You are not authorized user', 401));
  if (tokenData.role == 'False') {
    if (req.body.userid) {
      if (tokenData.userid != req.body.userid)
        return next(new AppError('You can not view cart or orders of another user with body', 401));
    }
    if (req.params.id) {
      if (tokenData.userid != req.params.id)
        return next(new AppError('You can not view cart or orders of another user with param', 401));
    }
  }
  next();
});
module.exports = {
  verifyAdmin,
  verifyUser,
};
