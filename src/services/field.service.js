const httpStatus = require('http-status');
const { Field } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} fieldBody
 * @returns {Promise<Field>}
 */
const createField = async (fieldBody) => {
  return Field.create(fieldBody);
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
const queryFields = async (filter, options) => {
  const fields = await Field.paginate(filter, options);
  return fields;
};

/**
 * Get a fields for given function name
 * @param {string} entity
 * @returns {Promise<QueryResult>}
 */
const getFields = async (entity) => {
  return Field.find({
    "entity": entity
  });
};



module.exports = {
    createField,
    queryFields,
    getFields
};
  