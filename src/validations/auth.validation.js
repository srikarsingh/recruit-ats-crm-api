const Joi = require('joi');
const { password,objectId } = require('./custom.validation');

const register = {
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
  
const login = {
  body: Joi.object().keys({
    user_email: Joi.string().required().email(),
    user_password: Joi.string().required().custom(password),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    user_email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    user_password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
