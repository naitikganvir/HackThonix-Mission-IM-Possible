const express = require("express");
const router = express.Router();
const Api = require("./model");
const analyzeAPI = require("./mlModel");

router.post("/check", async (req, res) => {
  const { url } = req.body;
  
  if (!url) return res.status(400).json({ message: "API URL is required" });

  // ML-based risk analysis
  const { status, accuracy } = analyzeAPI(url);

  // Save result to DB
  const newAPI = new Api({ url, status, accuracy });
  await newAPI.save();

  res.json({ url, status, accuracy });
});

router.get("/history", async (req, res) => {
  const history = await Api.find().sort({ _id: -1 });
  res.json(history);
});

module.exports = router;
