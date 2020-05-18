const notificationController = require("../controllers/notification");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", notificationController.getAllNotifications);

router.post("/", notificationController.createNotification);

router.put("/:_id", notificationController.updateNotification);

router.delete("/:_id", notificationController.deleteNotification);

router.get("/:_id", notificationController.getNotification);

module.exports = router;
