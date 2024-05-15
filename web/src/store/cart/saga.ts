import { type SagaIterator } from '@redux-saga/core';
import { cartActions } from './slice';
import { put, takeLatest } from 'redux-saga/effects';
import { orderActions } from '../order/slice';

const onHandleAddToCart = function* () {
  yield put(cartActions.getTotalQuantity());
};

const onHandleCheckout = function* () {
  yield put(cartActions.getCarts());
}

// Watcher Saga
function* cartWatcherSaga(): SagaIterator {
  yield takeLatest(cartActions.onHandleUpdateCart.fulfilled, onHandleAddToCart);
  yield takeLatest(cartActions.onHandDeleteCart.fulfilled, onHandleAddToCart);
  yield takeLatest(cartActions.onHandleAddToCart.fulfilled, onHandleAddToCart);
  yield takeLatest(orderActions.onHandleCheckout.fulfilled, onHandleCheckout);
}

export default cartWatcherSaga;
