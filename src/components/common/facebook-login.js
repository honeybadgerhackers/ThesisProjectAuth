import { Button } from 'react-native';
import React from 'react';
import { AuthSession } from 'expo';
import { loginUser } from '../../actions/user-actions';
import store from '../../store';

const FB_APP_ID = '530424093970397';

export default class FacebookLogin extends React.Component {
  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();

    // You need to add this url to your authorized redirect urls on your Facebook app
    console.log({ redirectUrl });

    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.

    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    if (result.type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    }

    let accessToken = result.params.access_token;
    let userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,last_name,first_name,email,picture.type(large)`);
    const {
      email, first_name, last_name, picture: { data: { url } },
    } = await userInfoResponse.json();
    const user = {
      first: first_name,
      last: last_name,
      profilePic: url,
      // ! THIS IS NOT SECURE ! //
      token: accessToken,
      email,
    };

    // ! This is where user state is being set ! //
    store.dispatch(loginUser(user));

  };

  render = () => (
    <Button
      title="Login with Facebook"
      onPress={this._handlePressAsync}
    />
  );
}
