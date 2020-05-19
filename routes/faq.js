const faqController = require("../controllers/faq");
const express = require("express");
const router = express.Router();

router.get("/", faqController.getAllFaqs);

router.post("/", faqController.createFaq);

router.delete("/:_id", faqController.deleteFaq);

router.put("/:_id", faqController.updateFaq);

router.get("/:_id", faqController.getFaq);

module.exports = router;
