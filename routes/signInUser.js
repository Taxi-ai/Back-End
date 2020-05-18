const signIn = require("../controllers/signInUser");

const express = require("express");
const router = express.Router();

router.post("/", signIn.signInUser);

module.exports = router;
