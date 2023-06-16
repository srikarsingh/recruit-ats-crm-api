const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    user_email: Joi.string().required().email(),
    user_password: Joi.string().required().custom(password),
    user_name: Joi.string().required(),
    user_role: Joi.string().required(),
    account_id: Joi.string().custom(objectId),
    user_status: Joi.string().required(),
    user_owner: Joi.string().custom(objectId),
    associated_teams:Joi.required()
  }),
};

const getUsers = {
  query: Joi.object().keys({
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user_email: Joi.string().email(),
      user_password: Joi.string().custom(password),
      user_name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
