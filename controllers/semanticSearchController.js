
const openai = require('../config/openaiConfig')

const generatEembedding = async (text) => {

  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  
  //console.log(response.data.data[0].embedding);

  return response.data.data[0].embedding
}

const cosineSimilarity = (vecA, vecB) => {
  return dotProduct(vecA, vecB) / (norm(vecA) * norm(vecB));
};

const norm = (vec) => {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
};

const dotProduct = (vecA, vecB) => {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
};

module.exports = { generatEembedding, cosineSimilarity }