import { type SagaIterator } from '@redux-saga/core';
import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import { userActions } from './slice';

const userApiUrl = `${BASE_URL}users/login`;

export function* loginUser(action: any): SagaIterator {
  try {
    const { email, password } = action.payload;
    const user = yield call(
      ipaCall as any,
      'POST',
      userApiUrl,
      {
        email,
        password,
        typeLogin: 'user',
      },
      {},
      false
    );

    const token = user.token;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    document.cookie = `token=${token}; expires=${expirationDate}; path=/`;
    toast.success('Login successful');

    yield put(userActions.loginUserSuccess(user));

    const previousPage = document.referrer;
    document.location.href = previousPage ? previousPage : '/';
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message.toString());
    }
  }
}

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
  yield takeEvery(userActions.loginUser, loginUser);
  yield takeEvery(userActions.logoutUser, logoutUser);
}

export default usersWatcherSaga;
