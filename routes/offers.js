const offerController = require("../controllers/offer");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", adminAuth, offerController.createOffer);

router.get("/", offerController.getAllOffers);

router.get("/:_id", offerController.getOffer);

router.put("/:_id", adminAuth, offerController.updateOffer);

router.delete("/:_id", adminAuth, offerController.deleteOffer);

module.exports = router;
