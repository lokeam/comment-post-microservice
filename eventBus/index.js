const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const POSTS_API_ENDPOINT = 'http://localhost:4000/events';
const COMMENTS_API_ENDPOINT = 'http://localhost:4001/events';
const QUERY_SERVICE_API_ENDPOINT = 'http://localhost:4002/events';
const MODERATION_SERVICE_API_ENDPOINT = 'http://localhost:4003/events';

app.post('/events', (request, response) => {
  const event = request.body;

  axios.post(POSTS_API_ENDPOINT, event).catch((error) => {
    console.log('EventBus error: ', error.message);
  });
  axios.post(COMMENTS_API_ENDPOINT, event).catch((error) => {
    console.log('EventBus error: ', error.message);
  });
  axios.post(QUERY_SERVICE_API_ENDPOINT, event).catch((error) => {
    console.log('EventBus error: ', error.message);
  });
  axios.post(MODERATION_SERVICE_API_ENDPOINT, event).catch((error) => {
    console.log('EventBus error: ', error.message);
  });

  response.send({staus: 'OK'});
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
