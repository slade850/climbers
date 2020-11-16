const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const eventController = require('./controller'); 

router.get("/", eventController.readEvent);
router.get("/:id", eventController.readOneEvent);
router.post("/create", eventController.creatEvent);
router.post("/update/:id", eventController.updateEvent);
router.post("/delete/:id", eventController.deleteEvent); 

module.exports = router;