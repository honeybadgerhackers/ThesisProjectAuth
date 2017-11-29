import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import Polyline from '@mapbox/polyline';

export default class WayPoint extends Component {
  state = {
    location: null,
    errorMessage: null,
    disableButton: false,
    userLocation: true,
    wayPoints: [],
    coords: [],
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

  componentDidMount() {
    this._getDirections('OperationSpark,NewOrleans,LA', 'CreoleCreamery,NewOrleans,LA');
  }

  componentWillUnmount() {
    this._stopTrackLocation();
  }

  _generateCustomDirections = async () => {
    const wayPointsObjects = [
      { lat: 29.946668, lng: -90.073911 },
      { lat: 29.944586, lng: -90.074984 },
      { lat: 29.942354, lng: -90.074833},
      { lat: 29.941369, lng: -90.074018 },
      { lat: 29.939909, lng: -90.075016 },
      { lat: 29.939054, lng: -90.077333 },
    ];
    const wayPoints = wayPointsObjects.map((waypoint) => {
      return Object.values(waypoint).join();
    })
    const origin = wayPoints.splice(0, 1);
    const destination = wayPoints.splice(wayPoints.length - 1, 1);
    const joinedWaypoints = wayPoints.join('|');
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${joinedWaypoints}`);
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState({ coords });
      console.log(this.state.coords);
      return coords;
    } catch (error) {
      return error;
    }
  }

  _getDirections = async (startLoc, destinationLoc) => {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`);
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState({ coords });
      console.log(this.state.coords);
      return coords;
    } catch (error) {
      return error;
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
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
    console.log(this.state.region);
  };

  _trackLocationAsync = async () => {
    this.setState({ disableButton: true });
    this.track = await Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 30000, enableHighAccuracy: true },
      this._handlePositionChange
    );
  }

  _stopTrackLocation = () => {
    // debugger;
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false });
    }
    this._generateCustomDirections();
  }

  _handlePositionChange = (location) => {
    console.log('current location', location);
    const wayPoints = this.state.wayPoints.slice();
    wayPoints.push(location);
    this.setState({ wayPoints, location });
    // console.log(this.state.wayPoints, 'way points');
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
        <MapView
          style={{ flex: 7 }}
          initialRegion={this.state.region}
          showsUserLocation={this.state.userLocation}
        >
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />
        </MapView>
        <View style={{ flex: 3}}>
          <Button
            disabled={this.state.disableButton}
            title="Watch Location"
            onPress={this._trackLocationAsync}
          />
          <Button
            title="Stop Watching"
            onPress={this._stopTrackLocation}
          />
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
