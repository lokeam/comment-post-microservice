const express = require('express');
const bodyParser = require('body-parser');
// generate new id for every posts
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// store every post we create

// testing storing posts in memory
const posts = {};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/posts', (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  // assign each post with a unique id
  posts[id] = {
    id, title
  };

  response.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});