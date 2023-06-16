const httpStatus = require('http-status');
const { getCandidateModel } = require('../models/candidate.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} candidate
 * @returns {Promise<Candidate>}
 */
const createCandidate = async (body) => {
    const Candidate = await getCandidateModel()
    if (body.candidate_email && (await Candidate.isEmailTaken(body.candidate_email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }    
    return Candidate.create(body);
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCandidates = async (filter, options) => {
    const Candidate = await getCandidateModel()
    const candidates = Candidate.paginate(filter, options);
    return candidates;
};

/**
 * Get candidate by id
 * @param {ObjectId} id
 * @returns {Promise<Candidate>}
 */
const getCandidateById = async (id) => {
    const Candidate = await getCandidateModel()
    const candidate = Candidate.findById(id);
    if (!candidate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Candidate not found');
    }
    return candidate;
};

/**
 * Get candidate by email
 * @param {string} candidate_email
 * @returns {Promise<Candidate>}
 */
const getCandidateByEmail = async (candidate_email) => {
    const Candidate = await getCandidateModel()
    const candidate = Candidate.findOne({ candidate_email });
    if (!candidate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Candidate not found');
    }
    return candidate;
};

/**
 * Update candidate by id
 * @param {ObjectId} candidateId
 * @param {Object} updateBody
 * @returns {Promise<Candidate>}
 */
const updateCandidateById = async (candidateId, updateBody) => {
    const Candidate = await getCandidateModel()
    const candidate = await getCandidateById(candidateId);
    if (updateBody.candidate_email && (await Candidate.isEmailTaken(updateBody.candidate_email, candidateId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const filter = { "_id": candidateId };
    const update = updateBody
    const opts = { new: true };
    const updatedCandidate = await Candidate.findOneAndUpdate(filter,update,opts)
    return updatedCandidate;
   
};

/**
 * Delete user by id
 * @param {ObjectId} candidateId
 * @returns {Promise<Candidate>}
 */
const deleteCandidateById = async (candidateId) => {
    const candidate = await getCandidateById(candidateId);
    if (!candidate) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Candidate not found');
    }
    await candidate.deleteOne();
    return candidate;
};

module.exports = {
    createCandidate,
    queryCandidates,
    getCandidateById,
    getCandidateByEmail,
    updateCandidateById,
    deleteCandidateById
};
  