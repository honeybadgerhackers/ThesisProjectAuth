import React from 'react';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../views/login-view';
import { loginUser } from '../../actions/user-actions';
import { FB_APP_ID, facebookAuthUri, SERVER_URI } from '../../../config';

class LoginContainer extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };

  state = {
    disableButton: false,
  }

  // componentDidMount = () => {
  //   console.log(this.props);
  //   console.log(this.state);
  // }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    this.setState({ disableButton: true });
    // ! You need to add this url to your authorized redirect urls on your Facebook app ! //
    console.log({ redirectUrl });

    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.

    
    const { type, params: { code } } = await AuthSession.startAsync({
      authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
    });

    if (type !== 'success') {
      Alert.alert('Error', 'Uh oh, something went wrong');
      this.setState({ disableButton: false });
      return;
    }

    const userInfoResponse = await fetch(SERVER_URI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        redirectUrl,
      }),
    });

    // let userInfoResponse = await fetch(serverUri(code));
    const userData = await userInfoResponse.json();
    if (userData.type !== 'success!') {
      Alert.alert('Error', 'Unable to retrieve user data');
      this.setState({ disableButton: false });
      return;
    }
    const {
      email, first_name, last_name,
      picture: { data: { url } },
      accessToken: { access_token, expires_in },
    } = userData;
    const user = {
      first: first_name,
      last: last_name,
      profilePic: url,
      token: access_token,
      email,
    };
    console.log(user);
    // ! This is where user state is being set ! //
    this.setState({ disableButton: false });
    this.props.loginUser(user);
  };

  render = () => (
    <LoginView disableButton={this.state.disableButton} _handlePressAsync={this._handlePressAsync} />
  );
}

const mapDispatchToProps = {
  loginUser,
};

const Login = connect(null, mapDispatchToProps)(LoginContainer);

export default Login;
