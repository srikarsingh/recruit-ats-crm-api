const express = require("express")
const validate = require('../middlewares/validate');
const companyController = require('../controllers/company.controller');
const companyValidation = require('../validations/company.validation');

const router = express.Router();

router.get("/", validate(companyValidation.getCompanies), companyController.getCompanies)

router.post("/", companyValidation.createCompany, companyController.createCompany)

router.get("/:companyId", validate(companyValidation.getCompany), companyController.getCompany)

router.post("/:companyId", companyValidation.updateCompany, companyController.updateCompany)

router.delete("/:companyId", validate(companyValidation.deleteCompany), companyController.deleteCompany)

module.exports = router;