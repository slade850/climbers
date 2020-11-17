const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const eventController = require('./controller'); 

router.get("/", authorize(["user","moderator","admin"]), eventController.readEvent);
router.post("/create", authorize(["user","moderator","admin"]), eventController.creatEvent);
router.post("/join/:id", authorize(["user","moderator","admin"]), eventController.joinEvent);
router.post("/leave/:id", authorize(["user", "moderator", "admin"]), eventController.leaveEvent);
router.post("/update/:id", authorize(["user","moderator","admin"]), eventController.updateEvent);
router.post("/delete/:id", authorize(["user","moderator","admin"]), eventController.deleteEvent); 

module.exports = router;