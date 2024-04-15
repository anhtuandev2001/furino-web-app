import { type SagaIterator } from '@redux-saga/core';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import { selectUser } from '../user/slice';
import { homeActions } from './slice';

const productApiUrl = `${BASE_URL}products`;

export function* onGetProducts(action: any): SagaIterator {
  try {
    const { limit, page } = action.payload;

    const products = yield call(
      ipaCall as any,
      'GET',
      productApiUrl,
      {},
      {
        limit,
        page,
      },
      false
    );

    yield put(homeActions.getProductsSucceeded(products));
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

export function* getCarts(): SagaIterator {
  try {
    const user = yield select(selectUser);
    const carts = yield call(
      ipaCall as any,
      'GET',
      `${BASE_URL}carts/${user.userId}`,
      {},
      {},
      true
    );
    yield put(homeActions.getCartsSucceeded(carts));
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

export function* onDeleteCart(action: any): SagaIterator {
  try {
    const cartId = action.payload;
    yield call(
      ipaCall as any,
      'DELETE',
      `${BASE_URL}carts/${cartId}`,
      {},
      {},
      true
    );
    yield put(homeActions.getCarts());
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

// Watcher Saga
function* homeWatcherSaga(): SagaIterator {
  yield takeEvery(homeActions.getProducts, onGetProducts);
  yield takeEvery(homeActions.getCarts, getCarts);
  yield takeEvery(homeActions.onDeleteCart, onDeleteCart);
}

export default homeWatcherSaga;
