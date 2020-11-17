const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const postController = require('./controller'); 
const upFiles = require('../../middle/upload');

router.get("/", authorize(["user","moderator","admin"]), postController.readPost);
router.post("/create", authorize(["user","moderator","admin"]), upFiles('medias', 'medias'),postController.creatPost);
router.post("/update/:id", authorize(["user","moderator","admin"]), postController.updatePost);
router.post("/delete/:id", authorize(["user","moderator","admin"]), postController.deletePost); 

module.exports = router;