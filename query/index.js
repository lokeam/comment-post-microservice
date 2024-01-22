const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*
Posts example:
{
  id: Str, (ex: 'alasdf312')
  title: Str (ex: 'Post Title')
  comments: Arr [
    comment: Obj {
      id: Str (ex: 'k246l1mn'),
      content: 'comment'
    }
  ]
}
*/

const EVENT_BUS_API_ENDPOINT = 'http://event-bus-srv:4005/events';
const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;

  handleEvent(type, data);

  response.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    const response = await axios.get(EVENT_BUS_API_ENDPOINT);

    for (let event of response.data) {
      console.log('Processing event: ', event.type);

      handleEvent(event.type, event.data)
    }
  } catch (error) {
    console.log(error.message);
  }
});
