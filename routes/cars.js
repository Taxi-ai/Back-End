const carController = require("../controllers/car");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Getting all companies
/*.....[Tested Successfully].......*/
router.get("/", adminAuth, carController.getAllCars);

// Creating new company
/*.....[Tested Successfully].......*/
router.post("/", adminAuth, carController.createCar);

// Updating company with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", adminAuth, carController.updateCar);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", adminAuth, carController.deleteCar);

// Getting company with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", adminAuth, carController.getCar);

module.exports = router;
