const express = require("express")
const router = express.Router();
const private_messageController = require('./controller'); 

router.get("/", private_messageController.readPrivate_message);
router.get("/:id", private_messageController.readOnePrivate_message);
router.post("/create", private_messageController.creatPrivate_message);
router.post("/update/:id", private_messageController.updatePrivate_message);
router.post("/delete/:id", private_messageController.deletePrivate_message); 

module.exports = router;