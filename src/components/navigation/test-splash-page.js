import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo';
import FacebookLogin from '../common/facebook-login';

const styles = StyleSheet.create({
  box: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const sagaMiddleware = createSagaMiddleware();

const Redirect = {
  render: () => (
    <View style={[styles.box]}>
      <Text>Welcome!</Text>
    </View>
  ),
};

export default Redirect;
