import { StyleSheet, View } from 'react-native';
import React from 'react';
// import PropTypes from 'prop-types';
import Login from './src/components/navigation/login';
// import createSagaMiddleware from 'redux-saga';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default class App extends React.Component {
  state = {
    userInfo: null,
  };

  render = () => (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
