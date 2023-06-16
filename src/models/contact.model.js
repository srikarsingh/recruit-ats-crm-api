const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { generateSchema } = require("../utils/schema-generator")

let Contact = null;

const setContactModel = async () => {
    let modelResponse = await generateSchema("contact")
    let schemaObj = modelResponse['schema'];
    let timeStampObj = modelResponse['timestamps']
    const contactSchema = mongoose.Schema(
        {   
            ...schemaObj
        },
        {
            ...timeStampObj
        }
    )
    
    // add plugin that converts mongoose to json
    contactSchema.plugin(toJSON);
    contactSchema.plugin(paginate);
    
    /**
     * Check if email is taken
     * @param {string} contact_email - The contact's email
     * @param {ObjectId} [excludeContactId] - The id of the contact to be excluded
     * @returns {Promise<boolean>}
     */
    contactSchema.statics.isEmailTaken = async function (contact_email, excludeContactId) {
        const contact = await this.findOne({ contact_email, _id: { $ne: excludeContactId } });
        return !!contact;
    };

    /**
     * @typedef Contact
     */
    Contact = mongoose.model("Contact", contactSchema);
}

const getContactModel = async () => {
    if(!Contact)
        await setContactModel()            
    return Contact
}

module.exports = {
    getContactModel,
    setContactModel
};