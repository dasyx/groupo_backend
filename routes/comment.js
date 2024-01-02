const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const comment = require("../controllers/comments");

router.post("/new", auth, comment.newComment);
router.delete("/:id", auth, comment.deleteComment);
router.put("/comment/edit/:id", auth, comment.updateComment);

router.get("/user/:id", auth, authAdmin, comment.getUserComments);
router.delete("/admin/:id", auth, authAdmin, comment.deleteComment);

module.exports = router;
