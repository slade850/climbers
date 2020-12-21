const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const levelController = require('./controller'); 

router.get("/", authorize(["user","moderator","admin"]), levelController.readLevel);
router.post("/create", authorize(["admin"]), levelController.creatLevel);
router.post("/update/:id", authorize(["admin"]), levelController.updateLevel);
router.post("/delete/:id", authorize(["admin"]), levelController.deleteLevel); 

module.exports = router;