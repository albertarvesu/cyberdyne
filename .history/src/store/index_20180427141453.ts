// import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';

// import { composeWithDevTools } from 'redux-devtools-extension';

// import storage from 'redux-persist/lib/storage';

// import { rootReducer } from '../reducers';
// import { rootSaga } from '../sagas';

// const persistConfig = {
//   key: 'root',
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const loggerMiddleware = createLogger({ collapsed: true });
//   const composeEnhancers = composeWithDevTools({});
//   const store = {
//     ...createStore(
//       persistedReducer,
//       {},
//       composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware))
//     ),
//     runSaga: sagaMiddleware.run(rootSaga)
//   };
//   const persistor = persistStore(store);
//   return { store, persistor };
// };


// tslint:disable-next-line:no-empty
const configureStore = () => {};

export default configureStore;