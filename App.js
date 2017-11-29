import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import WayPoint from './src/components/screens/location';
// import store from './src/store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});


const App = () => {
  return (
    // <Provider store={store}>
    <View style={styles.container}>
      <WayPoint />
    </View>
    // </Provider>
  );
};

export default App;
