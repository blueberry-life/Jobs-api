const express = require("express");

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJobs,
} = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJobs);

module.exports = router;
