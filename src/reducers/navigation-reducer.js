import { NavigationActions } from 'react-navigation';
import LoginStack from '../components/navigation/login-stack';

const ActionForLoggedOut = LoginStack.router.getActionForPathAndParams('login');
const ActionForLoggedIn = LoginStack.router.getActionForPathAndParams('redirect');

const stateForLoggedOut = LoginStack.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedIn = LoginStack.router.getStateForAction(ActionForLoggedIn);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@redux/INIT":
      return {
        ...state,
        stateForLoggedIn: LoginStack.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        ),
      };

    case 'LOGIN':
      return {
        ...state,
        stateForLoggedIn: LoginStack.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        ),
      };

    case 'LOGOUT':
      return {
        ...state,
        stateForLoggedOut: LoginStack.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "login" })]
          })
        )
      };

//     /* Other logic for logging out, more cleaner but unlike the above isn't telling the reader 
//            that navigation is reset, that's why I chose the *reset* one for the article. I prefer
//            this one, what about you?
        
//         case 'LOGOUT':
//             return { 
//               ...state, 
//               stateForLoggedIn, 
//               stateForLoggedOut
//             }
//             break;
//         */

    default:
      return {
        ...state,
        stateForLoggedIn: LoginStack.router.getStateForAction(
          action,
          state.stateForLoggedIn
        ),
      };
  }
};

export default navigationReducer;
