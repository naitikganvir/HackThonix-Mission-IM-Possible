const tf = require('@tensorflow/tfjs-node');
const apiDataset = require('./data/apiDataset.json');

// Prepare dataset
const urls = apiDataset.map((item) => item.apiUrl.length);
const labels = apiDataset.map((item) => (item.isFraud ? 1 : 0));

// Create model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [1], activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

// Train model
async function trainModel() {
  const xs = tf.tensor2d(urls, [urls.length, 1]);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  await model.fit(xs, ys, { epochs: 20 });
  console.log('Model training complete');
}

trainModel();

async function predictAPI(url) {
  const length = url.length;
  const inputTensor = tf.tensor2d([length], [1, 1]);

  const prediction = model.predict(inputTensor);
  const result = prediction.dataSync()[0];

  return result > 0.5 ? 'Fraud' : 'Safe';
}

module.exports = { predictAPI };
