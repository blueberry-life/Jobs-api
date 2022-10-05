const { StatusCodes } = require("http-status-codes");

async function getAllJobs(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "all jobs" } });
}

async function getJob(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "your job" } });
}

async function createJob(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "job created" } });
}

async function updateJob(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "job updated" } });
}

async function deleteJobs(req, res, next) {
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "job deleted" } });
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJobs };
