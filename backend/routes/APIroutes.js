// routes/apiRoutes.js
const express = require("express");
const { checkAPI } = require("../controllers/apiController");

const router = express.Router();

// API security check endpoint
router.post("/check", checkAPI);

module.exports = router;
