const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const POSTS_API_ENDPOINT = 'http://localhost:4000/events';
const COMMENTS_API_ENDPOINT = 'http://localhost:4001/events';
const QUERY_SERVICE_API_ENDPOINT = 'http://localhost:4002/events';

app.use(bodyParser.json());

app.post('/events', (request, response) => {
  const event = request.body;

  axios.post(POSTS_API_ENDPOINT, event);
  axios.post(COMMENTS_API_ENDPOINT, event);
  axios.post(QUERY_SERVICE_API_ENDPOINT, event);

  response.send({staus: 'OK'});
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
