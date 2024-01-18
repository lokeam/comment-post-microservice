const express = require('express');
const bodyParser = require('body-parser');
// Generate new id for every posts
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const EVENT_BUS_API_ENDPOINT = 'http://event-bus-srv:4005/events';

// Store every post we create

// Testing storing posts in memory
const posts = {};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/posts', async (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  // Assign each post with a unique id
  posts[id] = {
    id,
    title
  };

  /*
    After post, emit event to EventBus. Event will have two properties:
    type: PostCreated (Str, event that just occurred)
    data: Obj, info that clarifies what just happened

    EXAMPLE:
    {
      id: ''someIDHERE',
      title: 'new post'
    }
  */

  await axios.post(EVENT_BUS_API_ENDPOINT, {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  response.status(201).send(posts[id]);
});

// Post Events Handler
app.post('/events', (request, response) => {
  console.log('Received Event: ', request.body.type);
  response.send({});
});

app.listen(4000, () => {
  console.log('v55');
  console.log('Listening on 4000');
});
