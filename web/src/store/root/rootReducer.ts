import { type Action, combineReducers } from '@reduxjs/toolkit';
import shopsReducer from '../shop/slice';
import pagesReducer from '../page/slice';
import productDetailSlice from '../productDetail/slice';
import homeSlice from '../home/slice';
import userSlice from '../user/slice';

const appReducer = combineReducers({
  shops: shopsReducer,
  pages: pagesReducer,
  productDetails: productDetailSlice,
  homes: homeSlice,
  users: userSlice,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
