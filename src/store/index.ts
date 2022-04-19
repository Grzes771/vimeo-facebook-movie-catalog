import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers';
import { rootSaga } from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = [composeWithDevTools(applyMiddleware(sagaMiddleware))];

  const store = createStore(reducer, {}, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = configureStore();
