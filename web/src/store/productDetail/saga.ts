import { type SagaIterator } from '@redux-saga/core';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import { cartActions } from '../cart/slice';
import { selectUser } from '../user/slice';
import { productDetailActions } from './slice';

interface ActionProductProps {
  payload: number;
}

const productApiUrl = `${BASE_URL}products`;

export function* onGetProduct(action: ActionProductProps): SagaIterator {
  try {
    yield put(productDetailActions.onHandleLoading(true));
    const productId = action.payload;
    const product = yield call(
      ipaCall as any,
      'GET',
      `${productApiUrl}/${productId}`,
      {},
      {},
      false
    );
    yield put(productDetailActions.getProductSucceeded(product));

    const categoryId = product.productCategories?.map(
      (item: { categoryId: number }) => item.categoryId
    );

    const productSuggestions = yield call(
      ipaCall as any,
      'GET',
      productApiUrl,
      {},
      {
        productId,
        categoryId,
        limit: 4,
        page: 1,
      },
      false
    );
    console.log(productSuggestions);
    
    yield put(
      productDetailActions.getProductSuggestionsSucceeded(productSuggestions)
    );
    yield put(productDetailActions.onHandleLoading(false));
  } catch (e: any) {
    if (e instanceof Error) {
      yield put(productDetailActions.onHandleLoading(false));
      console.log(e.message.toString());
      toast.error(e.message.toString(), {
        autoClose: 1000,
      });
    }
  }
}

export function* onHandleAddToCart(action: any): SagaIterator {
  try {
    yield put(productDetailActions.onHandleLoadingButton(true));
    const { productId, quantity, productColorId, productSizeId } =
      action.payload;
    const user = yield select(selectUser);

    const cart = yield call(
      ipaCall as any,
      'POST',
      `${BASE_URL}carts`,
      {
        productId,
        quantity,
        productColorId,
        productSizeId,
        userId: user.userId,
      },
      {},
      true
    );
    if (typeof cart === 'object') {
      toast.success('Product added to cart');
      yield put(cartActions.getCarts());
    }
    if (typeof cart === 'string') {
      toast.error(cart);
    }
    yield put(productDetailActions.onHandleLoadingButton(false));
  } catch (e: any) {
    if (e instanceof Error) {
      yield put(productDetailActions.onHandleLoadingButton(false));
      toast.error('Error while performing this operation');
      console.log(e.message.toString());
    }
  }
}

// Watcher Saga
function* productDetailWatcherSaga(): SagaIterator {
  yield takeEvery(productDetailActions.getProduct, onGetProduct);
  yield takeEvery(productDetailActions.onHandleAddToCart, onHandleAddToCart);
}

export default productDetailWatcherSaga;
