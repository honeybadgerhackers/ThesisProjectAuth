require('dotenv').config();
const express = require('express');
const OAuthServer = require('express-oauth-server');
const fbAuth = require('./utilities/fb-auth-service');

const { PORT, REACT_NATIVE_PACKAGER_HOSTNAME } = process.env;

const app = express();
app.OAuth = new OAuthServer({
  model: {},
});

app.use(express.json());

app.post('/authorize', async (req, res) => {
  const { code, redirectUrl } = req.body;
  const data = await fbAuth.authorizeUser(code, redirectUrl);

  if (data.error) {
    res.sendStatus(500);
  }

  const { access_token, expires_in } = data;
  const user = await fbAuth.getUserProfile(access_token);
  user.accessToken = { access_token, expires_in };
  res.send(user);
});

app.listen({ host: REACT_NATIVE_PACKAGER_HOSTNAME, port: PORT }, () => {
  // eslint-disable-next-line
    console.log(`Listening on ${REACT_NATIVE_PACKAGER_HOSTNAME}:${PORT}`);
});
