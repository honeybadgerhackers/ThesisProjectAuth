import { StackNavigator } from 'react-navigation';
import Login from '../screens/login';
import Redirect from '../screens/test-splash-page';

const navigator = StackNavigator({
  login: {
    screen: Login,
  },
  // ! Replace me!
  redirect: {
    screen: Redirect,
  },
});

export default navigator;
