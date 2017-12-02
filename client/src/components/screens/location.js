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

  // * Sets default location on load
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  // * Default directions on screen - Testing purposes only, probably not useful
  componentDidMount() {
    this._getDirections('OperationSpark,NewOrleans,LA', 'CreoleCreamery,NewOrleans,LA');
  }

  // * This function is NECESSARY, unsubscribes to watchPosition to prevent memory leaks
  componentWillUnmount() {
    this._stopTrackLocation();
  }

  // * This will shoot a set of way points off to Google API and bring
  // *  back a list or coordinates.
  // * Right now, this is set up to either take an origin/destination
  // *  OR whatever way points are theoretically in State from a selected
  // *  route or server call -- May need to rework the check.
  // * If I spent more time on this, I would break the wayPoint array
  // *  processing out to another function.
  _getDirections = async (origin, destination, joinedWaypoints) => {
    if (!origin) {
      // ! Just a test object to ensure functionality
      const wayPointsObjects = [
        { lat: 29.946668, lng: -90.073911 },
        { lat: 29.944586, lng: -90.074984 },
        { lat: 29.942354, lng: -90.074833 },
        { lat: 29.941369, lng: -90.074018 },
        { lat: 29.939909, lng: -90.075016 },
        { lat: 29.939054, lng: -90.077333 },
      ];
      /*
        ! Way point array will probably come in a different format than
        !  the one above.
        ! This will deal with an object with JUST Latitude and Longitude.
        ! Our Way points in the database will almost certainly have more
        !  data on them.
      */
      const wayPoints = wayPointsObjects.map((wayPoint) => {
        return Object.values(wayPoint).join();
      });
      // * Splice and save the first element
      origin = wayPoints.splice(0, 1);
      // * Same, but the last element.
      destination = wayPoints.splice(wayPoints.length - 1, 1);
      // * Google's directions endpoint takes way points separated by pipe character
      joinedWaypoints = wayPoints.join('|');
    }
    try {
      let resp;
      // * Ali says all URLs should go in a config file. Maybe set these as a function
      // *  that returns the correct one with the space filled in?
      if (!joinedWaypoints) {
        resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${joinedWaypoints}`);
      } else {
        resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}`);
      }
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      // * coords is saved in state to re-render the directions line.
      this.setState({ coords });
      return coords;
    } catch (error) {
      return error;
    }
  }

  // * This fires off on page load, asks permission to access user location, and
  // *  sets the default location to it
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // * Sets current location to the users -
    this.setState({ location });
    // * Sets MAP current location.
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  };

  // * This currently fires off on simple button press, and tracks the users
  // *  location.
  // * distanceInterval takes meters
  // * timeInterval takes milliseconds
  // * enableHighAccuracy will get us better results, at the cost of battery
  // *  power.
  _trackLocationAsync = async () => {
    this.setState({ disableButton: true });
    this.track = await Location.watchPositionAsync(
      { distanceInterval: 5, timeInterval: 30000, enableHighAccuracy: true },
      this._handlePositionChange
    );
  }

  // * the callback for _trackLocationAsync
  _handlePositionChange = (location) => {
    // console.log('current location', location);
    // * pushes way points to a copy of the state's way points
    const wayPoints = this.state.wayPoints.slice();
    wayPoints.push(location);
    // * Replaces way points in state, also current location
    this.setState({ wayPoints, location });
  }

  // * This will stop location services on button press and on component un-mount.
  _stopTrackLocation = () => {
    if (this.track) {
      this.track.remove();
      this.setState({ disableButton: false });
    }
    this._getDirections();
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    // * Just FYI, MapView.Polyline needs to be nested inside of MapView.
    // * Could probably be broken off into it's own components to make this
    // *  file less sprawling.
    // * Watch location enables location tracking, Stop Watching turns it off
    // *  and also fires off the 'render way points' function.
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
