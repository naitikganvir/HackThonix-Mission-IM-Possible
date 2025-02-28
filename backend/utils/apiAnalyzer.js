// utils/apiAnalyzer.js
const analyzeAPI = async (url) => {
    // Mock analysis (Replace with ML logic later)
    const isMalicious = url.includes("malicious") || url.includes("sql-injection");
    const accuracy = isMalicious ? 75 : 95;
    const riskFactors = isMalicious ? ["SQL Injection", "XSS"] : [];
  
    return { isMalicious, accuracy, riskFactors };
  };
  
  module.exports = { analyzeAPI };
  