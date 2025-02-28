// controllers/apiController.js
const { analyzeAPI } = require("../utils/apiAnalyzer");

const checkAPI = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const result = await analyzeAPI(url);

    res.status(200).json({
      url,
      status: result.isMalicious ? "Suspicious" : "Safe",
      accuracy: result.accuracy,
      riskFactors: result.riskFactors,
    });
  } catch (error) {
    console.error("Error analyzing API:", error);
    res.status(500).json({ error: "Failed to analyze API" });
  }
};

module.exports = { checkAPI };
