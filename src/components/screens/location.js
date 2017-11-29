import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class WayPoint extends Component {
  state = {
    location: null,
    errorMessage: null,
    disableButton: false,
    wayPoints: [],
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location });
  };

  _trackLocationAsync = async () => {
    this.setState({ disableButton: true });
    Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 30000 },
      this._handlePositionChange
    );
  }

  _handlePositionChange = (location) => {
    const wayPoints = this.state.wayPoints.slice();
    wayPoints.push(location);
    this.setState({ wayPoints, location });
    console.log(this.state.wayPoints, 'way points');
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
        <Button
          disabled={this.state.disableButton}
          title="Watch Location"
          onPress={this._trackLocationAsync}
        />
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
