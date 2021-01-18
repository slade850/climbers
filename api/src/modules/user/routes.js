const express = require("express")
const authorize = require('../../middle/authorize');
const router = express.Router();
const upFiles = require('../../middle/upload'); 
const userController = require('./controller');

router.post("/register", upFiles('avatars', 'avatar'), userController.register);
router.put("/avatar", authorize(["user","moderator","admin"]), upFiles('avatars', 'avatar'), userController.updateAvatar);
router.put("/update", authorize(["user","moderator","admin"]), userController.updateUser);
router.post("/login", userController.login);
router.post("/lost-password", userController.lostPassword);
router.post("/reset-password/:token", userController.resetPassword);
router.get("/find", authorize(["user","moderator","admin"]), userController.findUser);
router.post("/add-contact", authorize(["user","moderator","admin"]), userController.addContact);
router.post("/accept-contact", authorize(["user","moderator","admin"]), userController.acceptContact)
router.get("/me", authorize(["user","moderator","admin"]), userController.getById);
router.get("/contacts", authorize(["user","moderator","admin"]), userController.getContact);
router.get("/profile/:slug", authorize(["user","moderator","admin"]), userController.getProfile);

module.exports = router;