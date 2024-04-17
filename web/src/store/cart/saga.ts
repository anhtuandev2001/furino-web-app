import { type SagaIterator } from '@redux-saga/core';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import { selectUser } from '../user/slice';
import { cartActions } from './slice';

const cartApiUrl = `${BASE_URL}carts`;

export function* getCarts(): SagaIterator {
  try {
    const user = yield select(selectUser);
    const carts = yield call(
      ipaCall as any,
      'GET',
      `${cartApiUrl}/${user.userId}`,
      {},
      {},
      true
    );
    yield put(cartActions.getCartsSucceeded(carts));
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
    yield put(cartActions.getCarts());
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

// Watcher Saga
function* cartWatcherSaga(): SagaIterator {
  yield takeEvery(cartActions.getCarts, getCarts);
  yield takeEvery(cartActions.onDeleteCart, onDeleteCart);
}

export default cartWatcherSaga;
