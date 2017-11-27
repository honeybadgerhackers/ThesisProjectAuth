import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import { Facebook, AuthSession } from 'expo';
import { StackNavigator } from 'react-navigation';

const FB_APP_ID = '530424093970397';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  box2: {
    flex: 10,
    // backgroundColor: '#8BC34A',
  },
  box3: {
    flex: 0.5,
    backgroundColor: '#e3aa1a',
  },
});

// const sagaMiddleware = createSagaMiddleware();

export default class App extends React.Component {
  state = {
    userInfo: null,
  };

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
    const userInfo = await userInfoResponse.json();
    this.setState({ userInfo });
    console.log(this.getState({ userInfo }));
  };

  something = () => {
    this.setState({
      something: this.state.something === 'Goodbye!' ? 'Hello!' : 'Goodbye!',
    });
  }

  render = () => (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text>bikeMap</Text>
      </View>
      <View style={[styles.box, styles.box2]}>
        <Text>Should say something: {this.state.something}</Text>
        <Button
          title="Button"
          onPress={this.something}
        />
        <Button
          title="Login with Facebox"
          onPress={this._handlePressAsync}
        />
      </View>
      <View style={[styles.box, styles.box3]}>
        <Text style={{ fontSize: 30 }}>STOP TELLING ME WHAT TO DO</Text>
      </View>
    </View>
  );
}

App.propTypes = {
  somethingElse: PropTypes.string,
};

App.defaultProps = {
  somethingElse: 'Goodbye',
};
