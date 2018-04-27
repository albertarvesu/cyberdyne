import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger({ collapsed: true });
  const composeEnhancers = composeWithDevTools({});
  const store = {
    ...createStore(
      rootReducer,
      {},
      composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };
  return { store };
};


export default configureStore;