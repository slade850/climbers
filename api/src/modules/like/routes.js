const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const likeController = require('./controller'); 

router.get("/", authorize(["user","moderator","admin"]), likeController.readLike);
router.post("/add", authorize(["user","moderator","admin"]), likeController.likePost);
router.post("/create", authorize(["admin"]), likeController.creatLike);
router.post("/delete/:id", authorize(["admin"]), likeController.deleteLike); 

module.exports = router;