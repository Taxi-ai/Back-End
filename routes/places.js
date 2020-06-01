const placeController = require("../controllers/place");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", placeController.createPlace);

router.post("/", placeController.createPlaces);

router.get("/", placeController.getAllPlaces);

router.get("/:_id", placeController.getPlace);

router.put("/:_id", adminAuth, placeController.updatePlace);

router.delete("/:_id", adminAuth, placeController.deletePlace);

module.exports = router;
