const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const user = require("../controllers/users");

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/:id", auth, user.getOneUser);
router.delete("/delete", auth, user.deleteUser);

router.get("/", auth, authAdmin, user.getAllUsers);
router.delete("/delete/:id", auth, authAdmin, user.deleteAccountAdmin);

router.put("/update/:id", auth, user.updateUser);

module.exports = router;
