const pointController = require("../controllers/point");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", pointController.createPoint);

router.post("/", pointController.createPoints);

router.get("/", pointController.getAllPoints);

router.get("/:_id", pointController.getPoint);

router.put("/:_id", adminAuth, pointController.updatePoint);

router.delete("/:_id", adminAuth, pointController.deletePoint);

module.exports = router;
