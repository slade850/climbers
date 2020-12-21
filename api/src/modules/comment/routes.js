const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const commentController = require('./controller'); 

router.post("/create", authorize(["user","moderator","admin"]), commentController.creatComment);
router.put("/update/:id", authorize(["user","moderator","admin"]), commentController.updateComment);
router.delete("/delete/:id", authorize(["user","moderator","admin"]), commentController.deleteComment); 

module.exports = router;