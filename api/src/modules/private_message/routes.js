const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const private_messageController = require('./controller');
const upFiles = require('../../middle/upload'); 

router.get("/by-contact/:contactId", authorize(["user","moderator","admin"]), private_messageController.readPrivate_message);
router.get("/invitation", authorize(["user","moderator","admin"]), private_messageController.readInvitation);
router.post("/create", authorize(["user","moderator","admin"]), upFiles('medias', 'medias'),private_messageController.creatPrivate_message);
router.post("/update/:id", authorize(["user","moderator","admin"]), private_messageController.updatePrivate_message);
router.post("/delete/:id", authorize(["user","moderator","admin"]), private_messageController.deletePrivate_message); 

module.exports = router;