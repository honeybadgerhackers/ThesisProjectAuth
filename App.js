import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import LoginNavigation from './src/components/navigation';
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
        <LoginNavigation />
      </View>
    </Provider>
  );
};

export default App;
