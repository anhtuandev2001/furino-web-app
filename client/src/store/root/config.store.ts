import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { rootSaga } from './rootSaga';
import rootReducer from './rootReducer';

const makeStore = () => {
  const __DEV__ = true;

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: __DEV__,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
