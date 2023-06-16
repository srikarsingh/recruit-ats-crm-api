const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();


router.post("/", auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
router.get("/", auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router.get("/:userId", auth('getUsers'), validate(userValidation.getUser), userController.getUser)
router.post("/:userId", auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
router.delete("/:userId",auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
