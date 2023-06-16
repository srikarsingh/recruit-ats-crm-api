const express = require("express")
const validate = require('../middlewares/validate');
const companyController = require('../controllers/company.controller');
const companyValidation = require('../validations/company.validation');

const router = express.Router();


//Show all companies
router.get("/", companyController.showAllCompanies)

//Creates a new company
router.post("/",  companyController.createNewCompany)

//Find company by slug
router.get("/:company_id", companyController.findCompanyById)

//Edit a company
router.post("/:company_id", companyValidation.updateCompany, companyController.editCompanyById)

//Delete a company
router.delete("/:company_id", validate(companyValidation.deleteCompany), companyController.deleteCompanyById)

router.get("/search", companyController.searchForCompanies)

module.exports = router;