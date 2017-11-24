import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const box_count = 3;
const box_height = height / box_count;

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <View style={[styles.box, styles.box1]}>
            <Text>Open up App.js to start working on your app!</Text>
          </View>
          <View style={[styles.box, styles.box2]}>
            <Text style={{ fontSize: 14 }}>NOOOOO</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text style={{ fontSize: 20 }}>YOU AREN'T THE BOSS OF ME</Text>
            <Text>Shake your phone to open the developer menu.</Text>
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text style={{ fontSize: 30 }}>STOP TELLING ME WHAT TO DO</Text>
          </View>
        </View>
    );
  }
}

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
    backgroundColor: '#2196F3'
  },
  box2: {
    flex: 10,
    backgroundColor: '#8BC34A'
  },
  box3: {
    flex: .5,
    backgroundColor: '#e3aa1a'
  }
});
