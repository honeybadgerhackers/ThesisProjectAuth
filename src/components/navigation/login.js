import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FacebookLogin from '../common/facebook-login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const sagaMiddleware = createSagaMiddleware();

export default class Login extends React.Component {
  state = {
    userInfo: null,
  };

  render = () => (
    <View style={styles.container}>
      <View style={[styles.box]}>
        <FacebookLogin />
      </View>
    </View>
  );
}

App.propTypes = {
  somethingElse: PropTypes.string,
};

App.defaultProps = {
  somethingElse: 'Goodbye',
};
