const express = require("express")
const router = express.Router();
const commentController = require('./controller'); 

router.get("/", commentController.readComment);
router.get("/:id", commentController.readOneComment);
router.post("/create", commentController.creatComment);
router.post("/update/:id", commentController.updateComment);
router.post("/delete/:id", commentController.deleteComment); 

module.exports = router;