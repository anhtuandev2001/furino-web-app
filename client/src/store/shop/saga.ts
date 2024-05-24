import { type SagaIterator } from '@redux-saga/core';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-hot-toast';
import { shopActions } from './slice';

export function* onGetProductOfShopPage(action: any): SagaIterator {
  try {
    yield put(shopActions.getCategories());
    yield put(shopActions.getProducts(action.payload));
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
      toast.error('Error while performing this operation');
    }
  }
}

export function* onGetProducts(action: any): SagaIterator {
  yield put(shopActions.getProducts(action.payload));
}

export function* getProductsLoadingNextPage(): SagaIterator {
  yield put(shopActions.getProductsLoadingNextPage());
}

// Watcher Saga
function* shopsWatcherSaga(): SagaIterator {
  yield takeEvery(
    shopActions.getProductOfShopPage.type,
    onGetProductOfShopPage
  );
  yield takeEvery(shopActions.onChangePage, onGetProducts);
  yield takeEvery(shopActions.onChangeLimit, onGetProducts);
  yield takeEvery(shopActions.onChangeSort, onGetProducts);
  yield takeLatest(shopActions.onchangeCategoryIds, onGetProducts);
  yield takeEvery(shopActions.onChangeKeyword, onGetProducts);
  yield takeEvery(shopActions.resetFilter, onGetProducts);
  yield takeEvery(shopActions.onNextPageScroll, getProductsLoadingNextPage);
}

export default shopsWatcherSaga;
