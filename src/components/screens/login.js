import React from 'react';
import { StyleSheet, Image, View, Button, Alert } from 'react-native';
import { AuthSession, LinearGradient } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/user-actions';
import { FB_APP_ID, facebookAuthUri, facebookUri } from '../../../config';

const styles = StyleSheet.create({
  box: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    flex: 5.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  boxButton: {
    flex: 4.5,
    justifyContent: 'center',
  },
  image: {
    flex: 0.5,
    resizeMode: 'contain',
  },
});

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

  componentDidMount = () => {
    console.log(this.props);
    console.log(this.state);
  }

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

    // ! change to CODE
    let result = await AuthSession.startAsync({
      authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
    });

    if (result.type !== 'success') {
      Alert.alert('Error', 'Uh oh, something went wrong');
      this.setState({ disableButton: false });
      return;
    }

    let accessToken = result.params.access_token;

    let userInfoResponse = await fetch(facebookUri(accessToken));
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
    this.setState({ disableButton: false });
    this.props.loginUser(user);
  };

  render = () => (
    <View style={[styles.box]}>
      <LinearGradient
        colors={['rgba(0,96,255,0.09)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      />
      <View style={[styles.boxImage]}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/bikemap_logo.png')}
        />
      </View>
      <View style={[styles.boxButton]}>
        <Button
          title="Login with Facebook"
          onPress={this._handlePressAsync}
          disabled={this.state.disableButton}
        />
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,96,255,0.06)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 100,
        }}
      />
    </View>
  );
}

const mapDispatchToProps = {
  loginUser,
};

const Login = connect(null, mapDispatchToProps)(LoginContainer);

export default Login;
