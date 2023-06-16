const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAccount =  {
    body: Joi.object().keys({
        account_name: Joi.string().required(),
    }),
};

const getAllAccounts = {
    query: Joi.object().keys({
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
};

const getAccountById = {
    params: Joi.object().keys({
        accountId: Joi.string().custom(objectId),
    })
};

const updateAccount = {
    params: Joi.object().keys({
        accountId: Joi.string().custom(objectId),
    }),
    body: Joi.object()
    .keys({
        account_owner: Joi.string(),
        account_name: Joi.string(),
    })
    .min(1)
};

const deleteAccount = {
    params: Joi.object().keys({
        accountId: Joi.string().custom(objectId)
    })
};
  
module.exports = {
    createAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount
};
  