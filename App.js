import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Login from './src/components/screens/login';
import store from './src/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Login />
      </View>
    </Provider>
  );
};

export default App;
