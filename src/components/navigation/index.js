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
    actions: PropTypes.shape({
      // dispatch: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isLoggedIn: null,
  };

  componentDidMount() {
    // console.log('index', this.props, this.props.actions.loginUser);
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
    const { navigationState, isLoggedIn, dispatch } = this.props;
    const { loginUser, logoutUser } = this.props.actions;
    const state = isLoggedIn ?
      navigationState.stateForLoggedIn :
      navigationState.stateForLoggedOut;
    const identityAction = isLoggedIn ?
      logoutUser :
      loginUser;
    return (
      <LoginStack navigation={addNavigationHelpers({ dispatch, state })} screenProps={{ identityAction }} />
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
    dispatch,
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoginNavigation);
