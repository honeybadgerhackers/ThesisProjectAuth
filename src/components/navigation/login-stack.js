import { StackNavigator } from 'react-navigation';
import Login from '../screens/login';
import Redirect from '../screens/test-splash-page';

console.log('inside LoginStack');

const LoginStack = StackNavigator({
  login: {
    screen: Login,
  },
  // ! Replace me!
  redirect: {
    screen: Redirect,
  },
}, { headerMode: 'screen' });

export default LoginStack;
