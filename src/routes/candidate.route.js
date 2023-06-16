const express = require("express")
const validate = require('../middlewares/validate');
const candidateController = require('../controllers/candidate.controller');
const candidateValidation = require('../validations/candidate.validation');

const router = express.Router();

router.post("/", candidateValidation.createCandidate, candidateController.createCandidate)

router.get("/", validate(candidateValidation.getCandidates), candidateController.getCandidates)

router.get("/:candidateId", validate(candidateValidation.getCandidate), candidateController.getCandidate)

router.put("/:candidateId", candidateValidation.updateCandidate, candidateController.updateCandidate)

router.delete("/:candidateId", validate(candidateValidation.deleteCandidate), candidateController.deleteCandidate)

module.exports = router;