const Validator = require('validatorjs');

const objectIdRegex = /^[0-9a-fA-F]{24}$/

Validator.register("objectId", value => objectIdRegex.test(value), '"{{#label}}" must be a valid mongo id')

const validator = async (body, rules, customMessages) => {
    const validation = new Validator(body, rules, customMessages);
    if (validation.passes()){
        return {
            status: true,
            errors: []
        }
    }else {
        return {
            status: false,
            errors: validation.errors
        }
    }
};
module.exports = validator;