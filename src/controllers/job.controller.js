const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');

const createJob = catchAsync(async (req, res) => {
    const field = await jobService.createJob(req.body)
    res.status(httpStatus.CREATED).send(field);
})

const getJobs = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['function', 'section']);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await jobService.queryJobs(filter, options);
    res.status(httpStatus.OK).send(result);
});

const getJob = catchAsync(async (req, res) => {
    const job = await jobService.getJobById(req.params.jobId);
    res.status(httpStatus.OK).send(job);
});

const updateJob = catchAsync(async (req, res) => {
    const job = await jobService.updateJobById(req.params.jobId, req.body);
    res.status(httpStatus.OK).send(job);
});

const deleteJob = catchAsync(async (req, res) => {
    await jobService.deleteJobById(req.params.jobId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
}