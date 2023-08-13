const express = require('express')
const { semanticSearch } = require('./controllers/semanticSearchController');

// app setup
const app = express()
app.listen(4000, () => console.log('listening to requests on port 4000'))

// middleware
app.use(express.json());
app.use(express.static('public'))

// routes
app.post('/openai/semantic_search', semanticSearch)
