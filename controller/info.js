const User = require('../models/User');
const Project = require('../models/Project');
exports.about = async (req, res, next) => {
  try {
    const banks = await User.find({ typeOfUser: 'Bank' }).count();
    const vendors = await User.find({ typeOfUser: 'Vendor' }).count();
    const beneficiaries = await User.find({
      typeOfUser: 'Beneficiary',
    }).count();
    const projects = await Project.find().count();
    const countObject = {
      banks: banks,
      vendors: vendors,
      beneficiaries: beneficiaries,
      projects: projects,
    };
    return res.status(200).json({
      success: true,
      data: countObject,
    });
  } catch (error) {
    next(error);
  }
};
exports.getChart = async (req, res, next) => {
  try {
    const projects = (
      await Project.find().sort('-goal').select('projectName').select('goal')
    ).splice(0, 5);
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log('hy');
    next(error);
  }
};
