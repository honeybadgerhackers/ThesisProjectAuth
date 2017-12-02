import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  box: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Redirect extends React.Component {
  static navigationOptions = {
    title: 'Redirect',
    header: null,
  };

  render = () => (
    <View style={[styles.box]}>
      <Text>Welcome!</Text>
    </View>
  );
};
