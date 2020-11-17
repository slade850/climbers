const express = require("express")
const authorize = require('../../middle/authorize');
const router = express.Router();
const upFiles = require('../../middle/upload'); 
const userController = require('./controller');

router.post("/register", upFiles('avatars', 'avatar'), userController.register);
router.post("/avatar", authorize(["user","moderator","admin"]), upFiles('avatars', 'avatar'), userController.updateAvatar);
router.post("/login", userController.login);
router.post("/add-contact", authorize(["user","moderator","admin"]), userController.addContact);
router.post("/accept-contact", authorize(["user","moderator","admin"]), userController.acceptContact)
router.get("/info", authorize(["user","moderator","admin"]), userController.getById);
router.get("/contacts", authorize(["user","moderator","admin"]), userController.getContact);

module.exports = router;