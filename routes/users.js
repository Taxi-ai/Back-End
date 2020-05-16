const userController = require("../controllers/user");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);

router.put("/:_id", userController.updateUser);

router.delete("/:_id", userController.deleteUser);

router.get("/:_id", userController.getUser);

module.exports = router;
