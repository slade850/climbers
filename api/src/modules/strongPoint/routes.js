const express = require("express")
const router = express.Router();
const strongPointController = require('./controller');
const authorize = require('../../middle/authorize');

router.get("/", authorize(["user","moderator","admin"]), strongPointController.readStrongPoint);
router.post("/create", authorize(["admin"]), strongPointController.creatStrongPoint);
router.put("/update/:id", authorize(["admin"]), strongPointController.updateStrongPoint);
router.delete("/delete/:id", authorize(["admin"]), strongPointController.deleteStrongPoint); 

module.exports = router;