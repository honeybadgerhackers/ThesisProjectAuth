import { StyleSheet, View } from 'react-native';
import React from 'react';
import Login from './src/components/navigation/login';
import Redirect from './src/components/navigation/test-splash-page';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const App = {
  render: () => {
    if (this.props.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Redirect />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default App;
