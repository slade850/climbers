const express = require("express")
const router = express.Router();
const authorize = require('../../middle/authorize');
const mediaController = require('./controller'); 

router.get("/me", mediaController.readMedia);
router.get("/me/:id", mediaController.readOneMedia);
router.post("/create", mediaController.creatMedia);
router.post("/update/:id", mediaController.updateMedia);
router.post("/delete/:id", mediaController.deleteMedia); 

module.exports = router;