const carController = require("../controllers/car");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", adminAuth, carController.getAllCars);

router.post("/", adminAuth, carController.createCar);

router.put("/:_id", adminAuth, carController.updateCar);

router.delete("/:_id", adminAuth, carController.deleteCar);

router.get("/:_id", adminAuth, carController.getCar);

module.exports = router;
