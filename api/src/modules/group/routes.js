const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const groupController = require('./controller'); 

router.get("/", authorize(["user","moderator","admin"]), groupController.readGroup);
router.get("/:id", authorize(["user","moderator","admin"]),  groupController.readOneGroup);
router.get("/me", authorize(["user","moderator","admin"]), groupController.readMyGroup);
router.post("/create", authorize(["user","moderator","admin"]), groupController.creatGroup);
router.post("/join/:id", authorize(["user","moderator","admin"]), groupController.joinGroup);
router.post("/update/:id", authorize(["user","moderator","admin"]), groupController.updateGroup);
router.post("/delete/:id", authorize(["user","moderator","admin"]), groupController.deleteGroup); 

module.exports = router;