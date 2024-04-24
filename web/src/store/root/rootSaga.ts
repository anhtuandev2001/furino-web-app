import { all, fork } from 'redux-saga/effects';

import shopsWatcherSaga from '../shop/saga';
import productDetailWatcherSaga from '../productDetail/saga';
import homeWatcherSaga from '../home/saga';
import usersWatcherSaga from '../user/saga';
import cartWatcherSaga from '../cart/saga';
import checkoutWatcherSaga from '../checkout/saga';

export function* rootSaga(): any {
    yield all([fork(shopsWatcherSaga)]);
    yield all([fork(productDetailWatcherSaga)]);
    yield all([fork(homeWatcherSaga)]);
    yield all([fork(usersWatcherSaga)]);
    yield all([fork(cartWatcherSaga)]);
    yield all([fork(checkoutWatcherSaga)]);
}

export default rootSaga;