const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app  = express();
app.use(bodyParser.json());
app.use(cors());

const EVENT_BUS_API_ENDPOINT = 'http://localhost:4005/events';

const commentsByPostId = {};

app.get('/posts/:id/comments', (request, response) => {
  response.send(commentsByPostId[request.params.id] || []);
});

app.post('/posts/:id/comments', async (request, response) => {
  const commentID = randomBytes(4).toString('hex');
  const { content } = request.body;

  const comments = commentsByPostId[request.params.id] || [];

  comments.push({ id: commentID, content });
  commentsByPostId[request.params.id] = comments;

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
    type: 'CommentCreated',
    data: {
      id: commentID,
      content,
      postId: request.params.id
    },
  });

  response.status(201).send(comments);
});

app.post('/events', (request, response) => {
  console.log('Event Received: ', request.body.type);

  response.send({});
});

app.listen(4001, () => {
  console.log('listening on 4001');
});
