const express = require("express")
const router = express.Router();
const groupController = require('./controller'); 

router.get("/", groupController.readGroup);
router.get("/:id", groupController.readOneGroup);
router.post("/create", groupController.creatGroup);
router.post("/update/:id", groupController.updateGroup);
router.post("/delete/:id", groupController.deleteGroup); 

module.exports = router;