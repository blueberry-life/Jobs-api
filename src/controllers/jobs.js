const { StatusCodes } = require("http-status-codes");

const { BadRequest, NotFound } = require("../errors");
const Job = require("../models/jobs");

async function getAllJobs(req, res, next) {
  const jobList = await Job.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { jobCount: jobList.length, jobList } });
}

async function getJob(req, res, next) {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findById({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFound("there is no job with this id");
  }
  return res.status(StatusCodes.OK).json({ success: true, data: { job } });
}

async function createJob(req, res, next) {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: { msg: "job created", user: req.user, job } });
}

async function updateJob(req, res, next) {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    throw new BadRequest("please provide company name and position");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      renValidators: true,
    }
  );
  if (!job) {
    throw new NotFound("there is no job with this id");
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "job updated" }, job });
}

async function deleteJobs(req, res, next) {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFound("there is no job with this id");
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: { msg: "job deleted", job } });
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJobs };
