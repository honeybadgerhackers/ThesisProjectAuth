import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Login from './src/components/navigation/login';
import store from './src/store';

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
    <Provider store={store}>
      <View style={styles.container}>
        <Login />
      </View>
    </Provider>
  );
}
