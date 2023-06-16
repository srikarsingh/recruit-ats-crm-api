const express = require("express")
const validate = require('../middlewares/validate');
const contactController = require('../controllers/contact.controller');
const contactValidation = require('../validations/contact.validation');

const router = express.Router();

router.post("/", contactValidation.createContact, contactController.createContact)

router.get("/", validate(contactValidation.getContacts), contactController.getContacts)

router.get("/:contactId", validate(contactValidation.getContact), contactController.getContact)

router.put("/:contactId", contactValidation.updateContact, contactController.updateContact)

router.delete("/:contactId", validate(contactValidation.deleteContact), contactController.deleteContact)

module.exports = router;