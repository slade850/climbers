const express = require("express")
const router = express.Router();
const groupMessageController = require('./controller');
const authorize = require('../../middle/authorize');
const upFiles = require('../../middle/upload');

router.get("/", authorize(["user","moderator","admin"]), groupMessageController.readAllGroupMessage); // only groups of which the user is a member;
router.get("/from/:groupSlug", authorize(["user","moderator","admin"]), groupMessageController.readGroupMessage);
router.post("/create", authorize(["user","moderator","admin"]), upFiles('medias', 'medias'), groupMessageController.creatGroupMessage);
router.put("/update/:id", authorize(["user","moderator","admin"]), groupMessageController.updateGroupMessage);
router.delete("/delete/:id", authorize(["user","moderator","admin"]), groupMessageController.deleteGroupMessage); 

module.exports = router;