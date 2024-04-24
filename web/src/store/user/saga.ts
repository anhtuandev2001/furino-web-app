import { type SagaIterator } from '@redux-saga/core';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import { userActions } from './slice';

export function logoutUser() {
  try {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    toast.success('Logout successful');
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

// Watcher Saga
function* usersWatcherSaga(): SagaIterator {
  yield takeEvery(userActions.logoutUser, logoutUser);
}

export default usersWatcherSaga;
