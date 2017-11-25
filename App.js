import React from 'react';
import PropTypes from 'prop-types';
import Expo from 'expo';
import { Button, StyleSheet, Text, View } from 'react-native';

const fbAppId = 530424093970397;

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      something: 'Goodbye!',
    };
    this.something = this.something.bind(this);
  }

  something() {
    console.log(this.state.something);
    this.setState({
      something: this.state.something === 'Goodbye!' ? 'Hello!' : 'Goodbye!',
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, styles.box1]}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        <View style={[styles.box, styles.box2]}>
          <Text>Should say something: {this.state.something}</Text>
          <Button
            onPress={this.something}
            title="Button"
          />
        </View>
        <View style={[styles.box, styles.box3]}>
          <Text style={{ fontSize: 30 }}>STOP TELLING ME WHAT TO DO</Text>
        </View>
      </View>
    );
  }
}

App.propTypes = {
  somethingElse: PropTypes.string,
};

App.defaultProps = {
  somethingElse: 'Goodbye',
};
