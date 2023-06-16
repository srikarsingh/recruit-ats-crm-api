const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { accountService } = require('../services');

const createAccount = catchAsync(async (req, res) => {
  const account = await accountService.createAccount(req.body);
  res.status(httpStatus.CREATED).send(account);
});

const getAllAccounts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const result = await accountService.queryAllAccounts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAccountById = catchAsync(async (req, res) => {
  const account = await accountService.getAccountById(req.params.accountId);
  res.status(httpStatus.OK).send(account);
});

const updateAccountById = catchAsync(async (req, res) => {
  const account = await accountService.updateAccountById(req.params.accountId, req.body);
  res.status(httpStatus.OK).send(account);
});

const deleteAccountById = catchAsync(async (req, res) => {
  await accountService.deleteAccountById(req.params.accountId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById,
};
