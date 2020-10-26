const express = require("express")
const router = express.Router();
const postController = require('./controller'); 

router.get("/", postController.readPost);
router.get("/:id", postController.readOnePost);
router.post("/create", postController.creatPost);
router.post("/update/:id", postController.updatePost);
router.post("/delete/:id", postController.deletePost); 

module.exports = router;