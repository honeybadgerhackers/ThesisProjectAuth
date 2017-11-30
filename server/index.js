require('dotenv').config();
const express = require('express');
const OAuthServer = require('express-oauth-server');

const { PORT, REACT_NATIVE_PACKAGER_HOSTNAME } = process.env;

const app = express();
app.OAuth = new OAuthServer({
  model: {},
});

app.use(express.json());

app.post('/authorize', (req, res) => {
  console.log('hello', req.body);
  res.send(200);
});

app.listen({ host: REACT_NATIVE_PACKAGER_HOSTNAME, port: PORT }, () => {
  // eslint-disable-next-line
    console.log(`Listening on ${REACT_NATIVE_PACKAGER_HOSTNAME}:${PORT}`);
});
