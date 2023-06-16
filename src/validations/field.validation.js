const Joi = require('joi');
const { entityTypes } = require('../config/entity')
const { password, objectId } = require('./custom.validation');

const createFields = {
  body: Joi.array().items({
    entity_type: Joi.string().required().valid(...Object.values(entityTypes)),
    field_type: Joi.string().required(),
    field_name: Joi.string().required(),
    field_label: Joi.string().required(),
    placeholder: Joi.string().allow('').optional(),
    section: Joi.string().required(),
    section_description:Joi.string().required(),
    is_array: Joi.boolean().optional(),
    system_field: Joi.boolean().optional(),
    is_custom_field: Joi.boolean().optional(),
    ref: Joi.boolean().optional(),
    order: Joi.number().required(),
    required: Joi.boolean().required(),
    disabled: Joi.boolean().required(),
    readonly: Joi.boolean().required(),
    sortable: Joi.boolean().required(),
    column_width: Joi.number().required(),
    visible_on_form: Joi.boolean().required(),
    visible_on_table: Joi.boolean().required(),
    filter_type: Joi.string().required(),
    validation_rules: Joi.array().optional(),
  })
};

const getFields = {
    query: Joi.object().keys({
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getField = {
  params: Joi.object().keys({
    entity: Joi.string().required().valid(...Object.values(entityTypes)),
  }),
};
  

module.exports = {
    createFields,
    getFields,
    getField
};
  