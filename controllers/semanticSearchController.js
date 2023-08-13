const fs = require('fs');
const path = require('path');

const openai = require('../config/openaiConfig')

const CACHE_FILE_PATH = path.join(__dirname, '../embeddings/embeddings.csv');

const generatEembedding = async (text) => {

  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  
  //console.log(response.data.data[0].embedding);

  return response.data.data[0].embedding
}

// Function that manages the cache and calls generatEembedding if needed
const generatEembeddingWithCache = async (text) => {
  const cacheMap = readCache();

  if (cacheMap.has(text)) {
    // If the text is in the cache, return the vector from the cache
    return cacheMap.get(text);
  } else {
    // If the text is not in the cache, call generatEembedding and update the cache
    const embeddingVector = await generatEembedding(text);

    // Update the cache file (append the new entry) only if it doesn't already exist
    appendToCache(text, embeddingVector);

    return embeddingVector;
  }
}

// Function to read the cache from the CSV file and return it as a Map
function readCache() {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      fs.writeFileSync(CACHE_FILE_PATH, 'text\tembedding\n', 'utf8');
      return new Map();
    }

    const cacheFile = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
    const lines = cacheFile.trim().split('\n');
    const cacheMap = new Map();

    // Start the loop from index 1 to skip the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const [text, embedding] = line.split('\t');
        cacheMap.set(text, JSON.parse(embedding));
      }
    }

    return cacheMap;
  } catch (error) {
    return new Map();
  }
}

// Function to append the updated cache to the CSV file
function appendToCache(text, embeddingVector) {
  const cacheMap = readCache();
  if (cacheMap.has(text)) {
    // If the entry already exists, no need to append again
    return;
  }

  const vectorString = JSON.stringify(embeddingVector);
  const newCacheLine = `${text}\t${vectorString}\n`;

  // Append to the file
  fs.appendFileSync(CACHE_FILE_PATH, newCacheLine, 'utf8');

  // Update the cacheMap with the new entry
  cacheMap.set(text, embeddingVector);
}
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

module.exports = { generatEembedding, cosineSimilarity, generatEembeddingWithCache }