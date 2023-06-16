const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { candidateService } = require('../services');

const createCandidate = catchAsync(async (req, res) => {
    const field = await candidateService.createCandidate(req.body)
    res.status(httpStatus.CREATED).send(field);
})

const getCandidates = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['function', 'section']);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await candidateService.queryCandidates(filter, options);
    res.status(httpStatus.OK).send(result);
});

const getCandidate = catchAsync(async (req, res) => {
    const candidate = await candidateService.getCandidateById(req.params.candidateId);
    res.status(httpStatus.OK).send(candidate);
});

const updateCandidate = catchAsync(async (req, res) => {
    const candidate = await candidateService.updateCandidateById(req.params.candidateId, req.body);
    res.status(httpStatus.OK).send(candidate);
});

const deleteCandidate = catchAsync(async (req, res) => {
    await candidateService.deleteCandidateById(req.params.candidateId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createCandidate,
    getCandidates,
    getCandidate,
    updateCandidate,
    deleteCandidate
}