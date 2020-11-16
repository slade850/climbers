const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const mediaController = require('./controller'); 

router.get("/", mediaController.readMedia);
router.get("/:id", mediaController.readOneMedia);
router.post("/create", mediaController.creatMedia);
router.post("/update/:id", mediaController.updateMedia);
router.post("/delete/:id", mediaController.deleteMedia); 

module.exports = router;