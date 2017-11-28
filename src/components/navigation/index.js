import React from 'react';
import { BackHandler } from "react-native";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import LoginStack from './login-stack';

class LoginNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigationState } = this.props;
    if (navigationState.stateForLoggedIn.index <= 1) {
      BackHandler.exitApp();
      return;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
    const { navigationState, dispatch, isLoggedIn } = this.props;
    const state = isLoggedIn ?
      navigationState.stateForLoggedIn :
      navigationState.stateForLoggedOut;
    return (
      <LoginStack navigation={addNavigationHelpers({ dispatch, state })} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user,
    navigationState: state.navigation,
  };
};

LoginNavigation.propTypes = {
  isLoggedIn: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    profilePic: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
  }),
};

LoginNavigation.defaultProps = {
  isLoggedIn: null,
};

export default connect(mapStateToProps)(LoginNavigation);
