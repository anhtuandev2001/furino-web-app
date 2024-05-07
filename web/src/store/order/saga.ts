import { put, select, takeEvery } from 'redux-saga/effects';
import { orderActions, selectOrder } from './slice';
import { userActions } from '../user/slice';

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

function* onChangeStatusOrder() {
  const order: any = select(selectOrder);
  yield put(orderActions.getOrder(order.data.orderId));
}

function* onHandleCheckout() {
  yield put(userActions.getUser());
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
