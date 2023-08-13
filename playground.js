const { generatEembedding, cosineSimilarity, generatEembeddingWithCache } = require('./controllers/semanticSearchController');

text1 = 'The boy playing in the street';
// text2 = 'The kid having fun in the raod';
text2 = 'It is a wonderfull morning';

generatEembeddingWithCache(text1)
  .then( embedding1 => {
    //console.log(embedding)
    generatEembeddingWithCache(text2).then( embedding2 => {
      //console.log(embedding2)
      console.log(cosineSimilarity(embedding1, embedding2))  
  })
})
