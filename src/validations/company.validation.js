const Joi = require('joi');
const validator = require('../utils/validate');
const { generateDynamicFormValidatorSchema } = require("./dynamic-form.validation")

const { password, objectId } = require('./custom.validation');

const createCompany = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("company")
    validationRule = {
        ...validationRule,
    } 
    const { status, errors } = await validator(req.body, validationRule, {})
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: errors
            });
    } else {
        next();
    }
};

const getCompanies = {
    query: Joi.object().keys({
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getCompany = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId),
    }),
};

const updateCompany = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("company")
    validationRule = {
        ...validationRule,
    }
    const { status: paramStatus, errors: paramErrors } = await validator(req.params, {
        companyId: "objectId"
    }, {})    
    const { status, errors } = await validator(req.body, validationRule, {})
    if (!paramStatus || !status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: [...paramErrors, errors]
            });
    } else {
        next();
    }
};

const deleteCompany = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId),
    }),
};
  

module.exports = {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany
};
  