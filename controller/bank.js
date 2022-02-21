const User = require("../models/User");

exports.getBanks = async (req, res, next) => {
  console.log("get details");
  const banks = await User.find({ typeOfUser: "Bank" });

  return res.status(200).json({
    success: true,
    data: banks,
  });
};
