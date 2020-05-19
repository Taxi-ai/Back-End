const offerController = require("../controllers/offer");

const express = require("express");
const router = express.Router();

// Removed admin auth temporarily for testing in front end
router.post("/", offerController.createOffer);

router.get("/", offerController.getAllOffers);

router.get("/:_id", offerController.getOffer);

router.put("/:_id", offerController.updateOffer);

router.delete("/:_id", offerController.deleteOffer);

module.exports = router;
