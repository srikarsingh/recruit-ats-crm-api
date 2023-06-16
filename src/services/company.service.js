const httpStatus = require('http-status');
const { getCompanyModel } = require('../models/company.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} company
 * @returns {Promise<Company>}
 */
const createCompany = async (body) => {
    const Company = await getCompanyModel()    
    return Company.create(body);
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
const queryCompanies = async (filter, options) => {
    const Company = await getCompanyModel()
    const companies = Company.paginate(filter, options);
    return companies;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
    const Company = await getCompanyModel()
    const company = Company.findById(id)
    if (!company) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
    }
    return company;
};

/**
 * Update company by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyId, updateBody) => {
    const Company = await getCompanyModel()
    const company = await getCompanyById(companyId);
    const filter = { "_id": companyId };
    const update = updateBody
    const opts = { new: true };
    const updatedCompany = await Company.findOneAndUpdate(filter,update,opts)
    return updatedCompany;
};

/**
 * Delete user by id
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyId) => {
    const company = await getCompanyById(companyId);
    if (!company) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
    }
    await company.deleteOne();
    return company;
};

module.exports = {
    createCompany,
    queryCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById
};
  