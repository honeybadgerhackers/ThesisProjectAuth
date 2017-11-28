import { createStore /* , applyMiddleware, compose */ } from 'redux';
// import { Provider } from 'react-redux';
import reducers from '../reducers';

const store = createStore(reducers);

// * Logs changes to state * //
store.subscribe(() => {
  console.log('currentState', store.getState());
});

export default store;
