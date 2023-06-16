const express = require("express")
const validate = require('../middlewares/validate');
const fieldController = require('../controllers/field.controller');
const fieldValidation = require('../validations/field.validation');

const router = express.Router();

router.post("/", validate(fieldValidation.createFields), fieldController.createFields)

router.get("/", validate(fieldValidation.getFields), fieldController.getFields)

router.get("/:entity", validate(fieldValidation.getField), fieldController.getFieldByEntity)

module.exports = router;