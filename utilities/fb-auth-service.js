const axios = require('axios');

const { FB_APP_ID, FB_SECRET } = process.env;

const FB_URI = 'https://graph.facebook.com/';
const FB_ENDPOINTS = {
  AUTH: 'v2.11/oauth/access_token',
  USER: 'me',
  DEBUG: 'debug_token',
  EXTEND: 'oauth/access_token',
};

module.exports = {
  authorizeUser: async (code, redirectUri) => (
    axios.get(FB_URI + FB_ENDPOINTS.AUTH, {
      params: {
        client_id: FB_APP_ID,
        redirect_uri: redirectUri,
        client_secret: FB_SECRET,
        code,
      },
    }).then(res => res.data).catch((err) => {
      // eslint-disable-next-line
      console.error(err);
    })
  ),

  debugToken: async token => (
    axios.get(FB_URI + FB_ENDPOINTS.DEBUG, {
      params: {
        input_token: token,
        app_token: undefined,
      },
    }).then(res => res.data)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      })
  ),

  extendToken: async token => (
    axios.get(FB_URI + FB_ENDPOINTS.EXTEND, {
      params: {
        client_id: FB_APP_ID,
        client_secret: FB_SECRET,
        fb_exchange_token: token,
      },
    }).then(res => res.data)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      })
  ),

  getUserProfile: async token => (
    axios.get(FB_URI + FB_ENDPOINTS.USER, {
      params: {
        access_token: token,
        fields: 'id,name,last_name,first_name,email,picture.type(large)',
      },
    }).then((res) => {
      res.data.type = 'success!';
      return res.data;
    }).catch((err) => {
      // eslint-disable-next-line
      console.error(err);
    })
  ),
};
