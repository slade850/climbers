const express = require("express")
const router = express.Router();
const climberProfileController = require('./controller'); 
const authorize = require('../../middle/authorize');

router.get("/", authorize(["user","moderator","admin"]), climberProfileController.getAllClimberProfile);
router.put("/update/me", authorize(["user","moderator","admin"]), climberProfileController.updateClimberProfile);
router.delete("/delete/me", authorize(["user","moderator","admin"]), climberProfileController.deleteClimberProfile); 

module.exports = router;