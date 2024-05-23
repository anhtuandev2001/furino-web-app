import { type SagaIterator } from '@redux-saga/core';
import { productDetailActions, selectProduct } from './slice';
import { put, select, takeLatest } from 'redux-saga/effects';

const getProductSaga = function* getProductSaga(): SagaIterator {
  const product: any = yield select(selectProduct);
  yield put(productDetailActions.getProductSuggestions(product.data.productId));
};

// Watcher Saga
function* productDetailWatcherSaga(): SagaIterator {
  yield takeLatest(productDetailActions.getProduct.fulfilled, getProductSaga);
}

export default productDetailWatcherSaga;
