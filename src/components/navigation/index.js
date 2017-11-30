import React from 'react';
import { bindActionCreators } from "redux";
import { BackHandler } from "react-native";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import LoginStack from './login-stack';
import { loginUser, logoutUser } from '../../actions/user-actions';

class LoginNavigation extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
      profilePic: PropTypes.string,
      token: PropTypes.string,
      email: PropTypes.string,
    }),
    navigationState: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.array,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      loginUser: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isLoggedIn: null,
  };

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
    const { loginUser, logoutUser } = this.props.actions;
    const state = isLoggedIn ?
      navigationState.stateForLoggedIn :
      navigationState.stateForLoggedOut;
    const identityAction = isLoggedIn ?
      loginUser :
      logoutUser;
    return (
      <LoginStack navigation={addNavigationHelpers({ dispatch, state })} identityAction={identityAction} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user,
    navigationState: state.navigation,
  };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginUser, logoutUser}, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoginNavigation);
