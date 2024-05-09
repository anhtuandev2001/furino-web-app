import { type SagaIterator } from '@redux-saga/core';
import { cartActions } from './slice';
import { put, takeLatest } from 'redux-saga/effects';

const onHandleAddToCart = function* () {
  yield put(cartActions.getTotalQuantity());
};

// Watcher Saga
function* cartWatcherSaga(): SagaIterator {
  yield takeLatest(cartActions.onHandleAddToCart.fulfilled, onHandleAddToCart);
}

export default cartWatcherSaga;
