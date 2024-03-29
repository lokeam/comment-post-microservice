const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const EVENT_BUS_API_ENDPOINT = 'http://event-bus-srv:4005/events';

app.post('/events', async (request, response) => {
  const { type, data } = request.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(EVENT_BUS_API_ENDPOINT, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }

  response.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});