import { createStore /* , applyMiddleware, compose */ } from 'redux';
// import { Provider } from 'react-redux';
import reducers from './reducers';

const defaultState = {
  user: {
    id: null,
    email: null,
    first: null,
    last: null,
    profilePic: null,
    token: null,
  },
};

const store = createStore(reducers, defaultState);

export default store;
