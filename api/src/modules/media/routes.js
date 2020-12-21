const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const mediaController = require('./controller');
const upFiles = require('../../middle/upload');

router.get("/me", authorize(["user","moderator","admin"]), mediaController.readMedia);
router.get("/shared-with-me", authorize(["user","moderator","admin"]), mediaController.readMediaSharedWithMe);
router.delete("/delete/:id", authorize(["user","moderator","admin"]), mediaController.deleteMedia); 

module.exports = router;