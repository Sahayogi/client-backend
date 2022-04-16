const errorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

exports.getProjects = async (req, res, next) => {
  let projects;
  try {
    const projects = await Project.find().sort('-relateBlockProj');
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectDetail = async (req, res, next) => {
  const projectId = req.params.id;
  console.log(typeof projectId);
  const projId = parseInt(projectId);
  let projects;
  try {
    const projects = await Project.findOne({ _id: projId });
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    return next(new ErrorResponse('Project Not Found', 404));
  }
};

exports.updateDonatedAmount = async (req, res, next) => {
  const { frId, amount } = req.body;
  console.log('Hi');
  try {
    const project = await Project.findOne({ frCount: parseInt(frId) });
    project.collectedToken += Number(amount);
    project.save();
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(new ErrorResponse('Project Not Found', 404));
  }
};
