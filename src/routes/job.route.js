const express = require("express")
const validate = require('../middlewares/validate');
const jobController = require('../controllers/job.controller');
const jobValidation = require('../validations/job.validation');

const router = express.Router();

router.post("/", jobValidation.createJob, jobController.createJob)

router.get("/", validate(jobValidation.getJobs), jobController.getJobs)

router.get("/:jobId", validate(jobValidation.getJob), jobController.getJob)

router.put("/:jobId", jobValidation.updateJob, jobController.updateJob)

router.delete("/:jobId", validate(jobValidation.deleteJob), jobController.deleteJob)

module.exports = router;