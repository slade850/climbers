const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const groupController = require('./controller');
const upFiles = require('../../middle/upload');

router.get("/", authorize(["user","moderator","admin"]), groupController.readGroup);
router.get("/by-id/:id", authorize(["user","moderator","admin"]),  groupController.readOneGroup);
router.get("/me", authorize(["user","moderator","admin"]), groupController.readMyGroup);
router.post("/create", authorize(["user","moderator","admin"]), upFiles('groupPictures', 'picture'), groupController.creatGroup);
router.post("/join/:id", authorize(["user","moderator","admin"]), groupController.joinGroup);
router.post("/leave/:id", authorize(["user", "moderator", "admin"]), groupController.leaveGroup);
router.post("/update/:id", authorize(["user","moderator","admin"]), upFiles('groupPictures', 'picture'), groupController.updateGroup);
router.post("/delete/:id", authorize(["user","moderator","admin"]), groupController.deleteGroup); 

module.exports = router;