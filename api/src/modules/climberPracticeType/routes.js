const express = require("express")
const router = express.Router();
const climberPracticeTypeController = require('./controller'); 
const authorize = require('../../middle/authorize');

router.get("/", authorize(["user","moderator","admin"]), climberPracticeTypeController.readClimberPracticeType);
router.post("/create", authorize(["admin"]), climberPracticeTypeController.creatClimberPracticeType);
router.put("/update/:id", authorize(["admin"]), climberPracticeTypeController.updateClimberPracticeType);
router.delete("/delete/:id", authorize(["admin"]), climberPracticeTypeController.deleteClimberPracticeType); 

module.exports = router;