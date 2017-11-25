import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import { Facebook } from 'expo';
import { StackNavigator } from 'react-navigation';

const fbAppId = '530424093970397';

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
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      something: 'Goodbye!',
    };
  }
  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        fbAppId, // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  something = () => {
    this.setState({
      something: this.state.something === 'Goodbye!' ? 'Hello!' : 'Goodbye!',
    });
  }
  render = () => (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <View style={[styles.box, styles.box2]}>
        <Text>Should say something: {this.state.something}</Text>
        <Button
          title="Button"
          onPress={this.something}
        />
        <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
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
