const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

exports.login = async (req, res, next) => {
  console.log('login called');
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }
    if (user.typeOfUser === 'Admin' || user.typeOfUser === 'AidAgency') {
      return next(new ErrorResponse('Please Use Admin Panel Instead', 400));
    }
    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }
    getToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const getToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    role: user.typeOfUser,
    email: user.email,
  });
};
