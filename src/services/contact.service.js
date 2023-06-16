const httpStatus = require('http-status');
const { getContactModel } = require('../models/contact.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} contact body
 * @returns {Promise<Contact>}
 */
const createContact = async (body) => {
    const Contact = await getContactModel()
    if (body.contact_email && (await Contact.isEmailTaken(body.contact_email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }    
    return Contact.create(body);
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async (filter, options) => {
    const Contact = await getContactModel()
    const contacts = Contact.paginate(filter, options);
    return contacts;
};

/**
 * Get contact by id
 * @param {ObjectId} id
 * @returns {Promise<Contact>}
 */
const getContactById = async (id) => {
    const Contact = await getContactModel();
    const contact = Contact.findById(id);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    return contact;
};

/**
 * Get contact by email
 * @param {string} email
 * @returns {Promise<Contact>}
 */
const getContactByEmail = async (contact_email) => {
    const Contact = await getContactModel()
    return Contact.findOne({ contact_email });
};

/**
 * Update contact by id
 * @param {ObjectId} contactId
 * @param {Object} updateBody
 * @returns {Promise<Contact>}
 */
const updateContactById = async (contactId, updateBody) => {
    const Contact = await getContactModel()
    const contact = await getContactById(contactId);
    if (updateBody.contact_email && (await Contact.isEmailTaken(updateBody.contact_email, contactId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const filter = { "_id": contactId };
    const update = updateBody
    const opts = { new: true };
    const updatedContact = await Contact.findOneAndUpdate(filter,update,opts)
    return updatedContact;

};

/**
 * Delete user by id
 * @param {ObjectId} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId) => {
    const contact = await getContactById(contactId);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    await contact.deleteOne();
    return contact;
};

module.exports = {
    createContact,
    queryContacts,
    getContactById,
    getContactByEmail,
    updateContactById,
    deleteContactById
};
  