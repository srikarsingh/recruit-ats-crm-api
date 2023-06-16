const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');

const createContact = catchAsync(async (req, res) => {
    const field = await contactService.createContact(req.body)
    res.status(httpStatus.CREATED).send(field);
})

const getContacts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['function', 'section']);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await contactService.queryContacts(filter, options);
    res.status(httpStatus.OK).send(result);
});

const getContact = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);
    res.status(httpStatus.OK).send(contact);
});

const updateContact = catchAsync(async (req, res) => {
    const contact = await contactService.updateContactById(req.params.contactId, req.body);
    res.status(httpStatus.OK).send(contact);
});

const deleteContact = catchAsync(async (req, res) => {
    await contactService.deleteContactById(req.params.contactId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
}