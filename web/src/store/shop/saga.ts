import { type SagaIterator } from '@redux-saga/core';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import { shopActions } from './slice';

const productApiUrl = `${BASE_URL}products`;

export function* onGetProductOfShopPage(action: any): SagaIterator {
  try {
    const categories = yield call(
      ipaCall as any,
      'GET',
      `${BASE_URL}categories`,
      {},
      {},
      false
    );
    yield put(shopActions.getCategoriesSuccess(categories));
    yield call(onGetProducts, action?.payload);
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
      toast.error('Error while performing this operation');
    }
  }
}
export function* onGetProducts(action: any): SagaIterator {
  try {
    const { limitUrl, pageUrl, keywordUrl, categoriesUrl } = action;

    if ((limitUrl && pageUrl) || categoriesUrl || keywordUrl) {
      yield put(
        shopActions.onChangeFilterFromUrl({
          keywordUrl,
          limitUrl: Number(limitUrl),
          pageUrl: Number(pageUrl),
          categoriesUrl,
        })
      );
    }

    const { limit, page, sort, keyword, categoryIdSelected } = yield select(
      (state) => state.shops
    );

    const products = yield call(
      ipaCall as any,
      'GET',
      productApiUrl,
      {},
      {
        limit,
        page,
        sort: sort === 'default' ? 'productId' : sort,
        categoryIds:
          categoryIdSelected.length > 0
            ? categoryIdSelected
                .map((item: { categoryId: number }) => item.categoryId)
                .join(',')
            : '',
        keyword,
      },
      false
    );
    const count = yield call(
      ipaCall as any,
      'GET',
      productApiUrl + '/getCount',
      {},
      {
        categoryIds:
          categoryIdSelected.length > 0
            ? categoryIdSelected
                .map((item: { categoryId: number }) => item.categoryId)
                .join(',')
            : '',
        keyword,
      },
      false
    );

    yield put(shopActions.onchangeCount(count));
    yield put(shopActions.getProductsSucceeded(products));
  } catch (e: any) {
    if (e instanceof Error) {
      ``;
      console.log(e.message.toString());
      toast.error('Error while performing this operation');
    }
  }
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
  yield takeEvery(shopActions.onchangeCategoryIdSelected, onGetProducts);
  yield takeEvery(shopActions.onChangeKeyword, onGetProducts);
}

export default shopsWatcherSaga;
