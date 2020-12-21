const express = require("express")
const router = express.Router();
const themeController = require('./controller');
const authorize = require('../../middle/authorize');

router.get("/", authorize(["user","moderator","admin"]), themeController.readTheme);
router.post("/create", authorize(["admin"]), themeController.creatTheme);
router.put("/update/:id", authorize(["admin"]), themeController.updateTheme);
router.delete("/delete/:id", authorize(["admin"]), themeController.deleteTheme); 

module.exports = router;