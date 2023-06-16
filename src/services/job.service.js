const httpStatus = require('http-status');
const { getJobModel } = require('../models/job.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} job
 * @returns {Promise<Job>}
 */
const createJob = async (body) => {
    const Job = await getJobModel()    
    return Job.create(body);
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
    const Job = await getJobModel()
    const jobs = Job.paginate(filter, options);
    return jobs;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
    const Job = await getJobModel()
    const job = Job.findById(id);
    if (!job) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }
    return job;
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobId, updateBody) => {
    const Job = await getJobModel()
    const job = await getJobById(jobId);
    if (!job) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }
    const filter = { "_id": jobId };
    const update = updateBody
    const opts = { new: true };
    const updatedJob = await Job.findOneAndUpdate(filter,update,opts)
    return updatedJob;
};

/**
 * Delete user by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const deleteJobById = async (jobId) => {
    const job = await getJobById(jobId);
    if (!job) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }
    await job.deleteOne();
    return job;
};

module.exports = {
    createJob,
    queryJobs,
    getJobById,
    updateJobById,
    deleteJobById
};
  