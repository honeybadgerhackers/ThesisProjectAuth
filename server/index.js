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

app.get('/', (req, res) => {
  res.send('Access Denied! \u{1F610}');
});

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

const serverParams = {
  port: PORT,
}

if (REACT_NATIVE_PACKAGER_HOSTNAME) {
  serverParams.host = REACT_NATIVE_PACKAGER_HOSTNAME;
}

app.listen(serverParams, () => {
  // eslint-disable-next-line
    console.log(`Listening on ${PORT}`);
});
