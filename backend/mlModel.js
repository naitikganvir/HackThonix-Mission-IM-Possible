const brain = require("brain.js");

const net = new brain.NeuralNetwork();

// Train the model with example data
net.train([
  { input: { length: 50, specialChars: 0.2 }, output: { safe: 1 } },
  { input: { length: 200, specialChars: 0.8 }, output: { suspicious: 1 } },
]);

function analyzeAPI(url) {
  const input = {
    length: url.length,
    specialChars: (url.match(/[^a-zA-Z0-9]/g) || []).length / url.length,
  };

  const result = net.run(input);
  const status = result.safe > result.suspicious ? "Safe" : "Suspicious";
  const accuracy = Math.round((Math.max(result.safe, result.suspicious) * 100));

  return { status, accuracy };
}

module.exports = analyzeAPI;
