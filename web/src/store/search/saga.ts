import { type SagaIterator } from '@redux-saga/core';
import { searchActions } from './slice';
import { put, takeLatest } from 'redux-saga/effects';

const searchWorkerSaga = function* searchWorkerSaga(): SagaIterator {
  yield put(searchActions.searchProductSuggest());
};

// Watcher Saga
function* searchWatcherSaga(): SagaIterator {
  yield takeLatest(searchActions.onChangeKeyword, searchWorkerSaga);
}

export default searchWatcherSaga;
