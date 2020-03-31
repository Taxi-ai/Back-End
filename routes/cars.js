const carController = require("../controllers/car");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

// Getting all companies
/*.....[Tested Successfully].......*/
router.get("/", auth, carController.getAllCars);

// Creating new company
/*.....[Tested Successfully].......*/
router.post("/", auth, carController.createCar);

// Updating company with required ID
/*.....[Tested Successfully].......*/
router.put("/:_id", auth, carController.updateCar);

// Deleting company with required ID
/*.....[Tested Successfully].......*/
router.delete("/:_id", auth, carController.deleteCar);

// Getting company with required ID
/*.....[Tested Successfully].......*/
router.get("/:_id", auth, carController.getCar);

module.exports = router;
