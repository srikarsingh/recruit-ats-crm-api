const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const accountValidation = require('../validations/account.validation');
const accountController = require('../controllers/account.controller');

const router = express.Router();

router.post("/", accountController.createAccount)
router.get("/", auth(), accountController.getAllAccounts)
router.get("/:accountId", auth(), accountController.getAccountById)
router.post("/:accountId", auth(), accountController.updateAccountById)
router.delete("/:accountId", auth(), accountController.deleteAccountById)

module.exports = router;
