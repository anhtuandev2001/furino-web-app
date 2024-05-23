import { put, select, takeEvery } from 'redux-saga/effects';
import { cartActions } from '../cart/slice';
import { userActions } from '../user/slice';
import { orderActions, selectOrder } from './slice';

// Worker Saga
function* onGetDistrict() {
  yield put(orderActions.getDistrict());
}

function* onGetWard() {
  yield put(orderActions.getWard());
}

function* onChangeStatusId() {
  yield put(orderActions.getOrders());
}

function* onChangeStatusOrder(): Generator<any, void, any> {
  const order = yield select(selectOrder);

  yield put(orderActions.getOrder(order.data.orderId));
}

function* onHandleCheckout() {
  yield put(userActions.getUser());
  yield put(cartActions.getCarts());
  yield put(cartActions.getTotalQuantity());
}

// Watcher Saga
function* checkoutWatcherSaga() {
  yield takeEvery(orderActions.onHandleChangeProvince, onGetDistrict);
  yield takeEvery(orderActions.onHandleChangeDistrict, onGetWard);
  yield takeEvery(orderActions.onChangeStatusId, onChangeStatusId);
  yield takeEvery(
    orderActions.onChangeStatusOrder.fulfilled,
    onChangeStatusOrder
  );
  yield takeEvery(orderActions.onHandleCheckout.fulfilled, onHandleCheckout);
}

export default checkoutWatcherSaga;
