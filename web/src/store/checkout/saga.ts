import { put, takeEvery } from 'redux-saga/effects';
import { checkoutActions } from './slice';

// Worker Saga
function* onGetDistrict() {
  yield put(checkoutActions.getDistrict());
}

function* onGetWard() {
  yield put(checkoutActions.getWard());
}

// Watcher Saga
function* checkoutWatcherSaga() {
  yield takeEvery(checkoutActions.onHandleChangeProvince, onGetDistrict);
  yield takeEvery(checkoutActions.onHandleChangeDistrict, onGetWard);
}

export default checkoutWatcherSaga;
