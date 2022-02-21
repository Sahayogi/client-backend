const User = require('../models/User');

exports.getVendors = async (req, res, next) => {
  const vendors = await User.find({ typeOfUser: 'Vendor' });

  return res.status(200).json({
    success: true,
    data: vendors,
  });
};
