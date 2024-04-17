import { type SagaIterator } from '@redux-saga/core';
import { call, put, takeEvery } from 'redux-saga/effects';

import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
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

// Watcher Saga
function* homeWatcherSaga(): SagaIterator {
  yield takeEvery(homeActions.getProducts, onGetProducts);
}

export default homeWatcherSaga;
