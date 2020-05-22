const faqController = require("../controllers/faq");
const adminAuth = require("../middleware/adminAuth");

const express = require("express");
const router = express.Router();

router.get("/", faqController.getAllFaqs);

router.post("/", adminAuth, faqController.createFaq);

router.delete("/:_id", adminAuth, faqController.deleteFaq);

router.put("/:_id", adminAuth, faqController.updateFaq);

router.get("/:_id", faqController.getFaq);

module.exports = router;
