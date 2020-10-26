const express = require("express")
const authorize = require('../../middle/authorize');
const router = express.Router();

const userController = require('./controller');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/info", authorize(["user", "admin"]), userController.getById);

module.exports = router;