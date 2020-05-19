const userController = require("../controllers/user");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);

router.put("/:_id", userController.updateUser);

router.delete("/:_id", userController.deleteUser);

router.delete("/:_id/creditCards", userController.deleteUserCreditCard);

router.post("/:_id/creditCards", userController.addUserCreditCard);

router.get("/:_id", userController.getUser);

router.get("/:_id/notifications", userController.getUserNotifications);

router.get("/:_id/creditCards", userController.getUserCreditCards);

router.get("/:_id/appRate", userController.getUserAppRate);

router.post("/:_id/appRate", userController.addUserAppRate);

router.post("/:_id/packages", userController.addUserPackage);

router.post("/:_id/addMoneyToWallet", userController.addMoneyToWallet);

router.get("/:_id/packages", userController.getUserPackage);

router.delete("/:_id/packages", userController.deleteUserPackage);

module.exports = router;
