import { createStore, applyMiddleware /* , compose */ } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { Provider } from 'react-redux'
import { rootSaga } from '../sagas';
import reducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// * Logs changes to state * //
store.subscribe(() => {
  console.log('currentState', store.getState());
});

export default store;
