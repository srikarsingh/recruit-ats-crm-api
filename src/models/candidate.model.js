const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { generateSchema } = require("../utils/schema-generator")

let Candidate = null;

const setCandidateModel = async () => {
    let modelResponse = await generateSchema("candidate")
    let schemaObj = modelResponse['schema'];
    let timeStampObj = modelResponse['timestamps']
    let candidatesSchema = mongoose.Schema(
        {   
            ...schemaObj
        },
        {
            ...timeStampObj
        }
    )
    
    // add plugin that converts mongoose to json
    candidatesSchema.plugin(toJSON);
    candidatesSchema.plugin(paginate);
    
    /**
     * Check if email is taken
     * @param {string} candidate_email - The user's email
     * @param {ObjectId} [excludeCandidateId] - The id of the user to be excluded
     * @returns {Promise<boolean>}
     */
    candidatesSchema.statics.isEmailTaken = async function (candidate_email, excludeCandidateId) {
        const candidate = await this.findOne({ candidate_email, _id: { $ne: excludeCandidateId } });
        return !!candidate;
    };

    /**
     * @typedef Candidate
     */
    Candidate = mongoose.model("Candidate", candidatesSchema);
}

const getCandidateModel = async () => {
    if(!Candidate)
        await setCandidateModel()            
    return Candidate
}

module.exports = {
    getCandidateModel,
    setCandidateModel
};