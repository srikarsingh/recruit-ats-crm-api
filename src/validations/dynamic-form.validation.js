const Joi = require('joi');
const { generateSchema } = require("../utils/schema-generator")

const generateDynamicFormValidatorSchema = async (entity) => {
    newSchemaObj = await generateSchema(entity)
    validationRules = {}
    for(field in newSchemaObj){
        currentChain = Joi
        currentSchema = newSchemaObj[field]
        if(Array.isArray(currentSchema)){
            currentChain = currentChain.array().optional()
            newNextOne = {}
            for(nest_field in currentSchema[0]){
                newNextOne[nest_field] = !newNextOne[nest_field] ? [] : newNextOne[nest_field]
                if(currentSchema[0][nest_field]["required"]){
                    newNextOne[nest_field].push("required")
                }
                if(newNextOne[nest_field].length != 0){
                    newNextOne[nest_field] = newNextOne[nest_field].join("|")
                    validationRules[field + ".*." + nest_field] = newNextOne[nest_field]                                    
                }
            }
            newNextOne[nest_field] = "array"            
        }else {
            validationRules[field] = !validationRules[field] ? [] : validationRules[field]
            if(currentSchema["required"]){
                validationRules[field].push("required")
            }
            if(validationRules[field].length == 0){
                delete validationRules[field]
            }else {
                validationRules[field] = validationRules[field].join("|")           
            }              
            
        }        
    }
    return validationRules
}

module.exports = {
    generateDynamicFormValidatorSchema
}