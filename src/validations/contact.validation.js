const Joi = require('joi');
const validator = require('../utils/validate');
const { generateDynamicFormValidatorSchema } = require("./dynamic-form.validation")

const { password, objectId } = require('./custom.validation');

const createContact = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("contact")
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

const getContacts = {
    query: Joi.object().keys({
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getContact = {
    params: Joi.object().keys({
        contactId: Joi.string().custom(objectId),
    }),
};

const updateContact = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("contact")
    validationRule = {
        ...validationRule
    }
    const { status: paramStatus, errors: paramErrors } = await validator(req.params, {
        contactId: "objectId"
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

const deleteContact = {
    params: Joi.object().keys({
        contactId: Joi.string().custom(objectId),
    }),
};
  

module.exports = {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
};
  