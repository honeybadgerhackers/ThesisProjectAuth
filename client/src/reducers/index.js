import { combineReducers } from 'redux';
import user from './user-reducer';
import navigation from './navigation-reducer';

const AppReducer = combineReducers({
  user,
  navigation,
});

export default AppReducer;
