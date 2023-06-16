const { Field } = require("../models")
const mongoose = require("mongoose");
const generateSchema = async (entity_type) => {
    const fields = await Field.find({entity_type: entity_type}).lean()
    let timestampObj = {}
    let schemaObj = {}
    for (field of fields){
        if(field["field_type"] == "date_time"){
            if(field["field_name"].indexOf('added_on') > -1){
                timestampObj.createdAt = field["field_name"]
            }
            if(field["field_name"].indexOf('last_modified') > -1){
                timestampObj.updatedAt = field["field_name"]
            }
        }{
            let obj = {}
            if(field["field_type"] == "text" || field["field_type"] == "textarea" || field["field_type"]=="dropdown"){
                obj.type = String
            }else if(field["field_type"] == "multi_text"){
                obj.type = Array
            }else if(field["field_type"] == "number"){
                obj.type = Number
            }else if(field["field_type"] == "toggle" || field["field_type"] == "boolean" ){
                obj.type = Boolean
            }else if(field["field_type"] == "date"){
                obj.type = Date
            }
            if(field["ref"] != undefined){
                obj.type = mongoose.Schema.Types.ObjectId,
                obj.ref = field["ref"]
            }
            if(field['required'] == true){
                obj["required"] = true;
            }
           
            if(field["is_array"]){
                if(!schemaObj[field["section"]]){
                    schemaObj[field["section"]] = []
                }
                let sub_obj = {}
                sub_obj[field["field_name"]] = obj;
                schemaObj[field["section"]].push(sub_obj)
            }else {
                schemaObj[field["field_name"]] = obj;
            }
        }
    }
    // console.log(schemaObj)
    return { 
        "schema": schemaObj,
        "timestamps":{
            "timestamps": timestampObj
        }
    }
}

module.exports = {
    generateSchema
}