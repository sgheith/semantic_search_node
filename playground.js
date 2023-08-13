const { semanticSearch } = require('./controllers/semanticSearchController');

// text1 = 'The boy playing in the street';
// text2 = 'The kid having fun in the raod';
// //text2 = 'It is a wonderfull morning';

// generatEembeddingWithCache(text1)
//   .then( embedding1 => {
//     //console.log(embedding)
//     generatEembeddingWithCache(text2).then( embedding2 => {
//       //console.log(embedding2)
//       console.log(cosineSimilarity(embedding1, embedding2))  
//   })
// })

let targetList = [
  "It's raining cats and dogs outside",
  "It's pouring rain outside",
  "The weather outside is awful, it's a complete downpour",
  "The rain is coming down heavily outside",
  "Outside, it's a torrential downpour",
  "I need to pick up some groceries",
  "I need to do some grocery shopping",
  "I have to buy some groceries",
  "I need to go shopping for food",
  "I need to get some food from the supermarket"
];

semanticSearch("It's really rainy outside", targetList, 5)
//semanticSearch("I have to buy some groceries", targetList, 5)
  .then(res => console.log(res))
  .catch(err => console.error(err));
