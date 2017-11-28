import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  box: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Redirect = {
  render: () => (
    <View style={[styles.box]}>
      <Text>Welcome!</Text>
    </View>
  ),
};

export default Redirect;
