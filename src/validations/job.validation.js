const Joi = require('joi');
const validator = require('../utils/validate');
const { generateDynamicFormValidatorSchema } = require("./dynamic-form.validation")

const { password, objectId } = require('./custom.validation');

const createJob = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("job")
    validationRule = {
        ...validationRule
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

const getJobs = {
    query: Joi.object().keys({
        function: Joi.string(),
        section: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getJob = {
    params: Joi.object().keys({
        jobId: Joi.string().custom(objectId),
    }),
};

const updateJob = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("job")
    validationRule = {
        ...validationRule,
        name: "required",        
        user: "objectId"
    }
    const { status: paramStatus, errors: paramErrors } = await validator(req.params, {
        jobId: "objectId"
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

const deleteJob = {
    params: Joi.object().keys({
        jobId: Joi.string().custom(objectId),
    }),
};
  

module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
};
  