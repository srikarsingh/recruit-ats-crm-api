const httpStatus = require('http-status');
const { Account,User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} account_details
 * @returns {Promise<Account>}
 */
const createAccount = async (account_details) => {
  if (await Account.isAccountNameTaken(account_details.account_name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account name already taken');
  }
  if (await User.isEmailTaken(account_details.user_email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Email already taken');
  }
  let account = await Account.create(account_details);
  account_details['account_id'] = account['_id'];
  
  let user = await User.create(account_details);

  const filter = { "account_name": account['account_name'] };
  const update = { "account_owner":user['_id'] };
  const opts = { new: true };
  account = await Account.findOneAndUpdate(filter,update,opts)
  return { account, user }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllAccounts = async (filter, options) => {
  const accounts = await Account.paginate(filter, options);
  return accounts;
};

/**
 * Get account by id
 * @param {ObjectId} accountId
 * @returns {Promise<Account>}
 */
const getAccountById = async (accountId) => {
  const account = Account.findById(accountId)
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }
  return account;
};

/**
 * Update account by id
 * @param {ObjectId} accountId
 * @param {Object} updateObj
 * @returns {Promise<User>}
 */
const updateAccountById = async (accountId, updateObj) => {
  const account = await getAccountById(account_id);

  if (updateObj.account_name && (await Account.isAccountNameTaken(updateObj.account_name,accountId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Account already taken');
  }
  const filter = { "_id": accountId };
  const update = updateObj;
  const opts = { new: true };
  const updated_account = await Account.findOneAndUpdate(filter,update,opts);
  return updated_account;
};

/**
 * Delete Account by id
 * @param {ObjectId} accountId
 * @returns {Promise<Account>}
 */
const deleteAccountById = async (accountId) => {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account not found');
  }
  await account.remove();
  return account;
};

module.exports = {
  createAccount,
  queryAllAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById
};
