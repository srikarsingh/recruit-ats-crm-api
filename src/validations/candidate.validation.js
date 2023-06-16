const Joi = require('joi');
const validator = require('../utils/validate');
const { generateDynamicFormValidatorSchema } = require("./dynamic-form.validation")

const { password, objectId } = require('./custom.validation');

const createCandidate = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("candidate")
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

const getCandidates = {
    query: Joi.object().keys({
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getCandidate = {
    params: Joi.object().keys({
        candidateId: Joi.string().custom(objectId),
    }),
};

const updateCandidate = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("candidate")
    validationRule = {
        ...validationRule
    }
    const { status: paramStatus, errors: paramErrors } = await validator(req.params, {
        candidateId: "objectId"
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

const deleteCandidate = {
    params: Joi.object().keys({
        candidateId: Joi.string().custom(objectId),
    }),
};
  

module.exports = {
    createCandidate,
    getCandidates,
    getCandidate,
    updateCandidate,
    deleteCandidate
};
  