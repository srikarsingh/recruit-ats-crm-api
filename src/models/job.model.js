const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { generateSchema } = require("../utils/schema-generator")

let Job = null;

const setJobModel = async () => { 
    let modelResponse = await generateSchema("job")
    let schemaObj = modelResponse['schema'];
    let timeStampObj = modelResponse['timestamps']
    const jobSchema = mongoose.Schema(
        {   
            ...schemaObj
        },
        {
            ...timeStampObj
        }
    )
    
    // add plugin that converts mongoose to json
    jobSchema.plugin(toJSON);
    jobSchema.plugin(paginate);
    
    /**
     * @typedef Job
     */
    Job = mongoose.model("Job", jobSchema);
}

const getJobModel = async () => {
    if(!Job)
        await setJobModel()            
    return Job
}

module.exports = {
    getJobModel,
    setJobModel
};