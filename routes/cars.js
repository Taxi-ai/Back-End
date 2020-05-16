const carController = require("../controllers/car");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.get("/", carController.getAllCars);

router.post("/", carController.createCar);

router.put("/:_id", carController.updateCar);

router.delete("/:_id", carController.deleteCar);

router.get("/:_id", carController.getCar);

module.exports = router;
