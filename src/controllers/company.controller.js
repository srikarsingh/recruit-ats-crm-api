const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');

const createCompany = catchAsync(async (req, res) => {
    const field = await companyService.createCompany(req.body)
    res.status(httpStatus.CREATED).send(field);
})

const getCompanies = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['function', 'section']);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await companyService.queryCompanies(filter, options);
    res.status(httpStatus.OK).send(result);
});

const getCompany = catchAsync(async (req, res) => {
    const company = await companyService.getCompanyById(req.params.companyId);
    res.status(httpStatus.OK).send(company);
});

const updateCompany = catchAsync(async (req, res) => {
    const company = await companyService.updateCompanyById(req.params.companyId, req.body);
    res.status(httpStatus.OK).send(company);
});

const deleteCompany = catchAsync(async (req, res) => {
    await companyService.deleteCompanyById(req.params.companyId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany
}