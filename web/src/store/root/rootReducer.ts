import { combineReducers, type Action } from '@reduxjs/toolkit';
import pagesReducer from '../page/slice';
import productDetailSlice from '../productDetail/slice';
import shopsReducer from '../shop/slice';
import userSlice from '../user/slice';
import cartSlice from '../cart/slice';
import homeSlice from '../home/slice';

const appReducer = combineReducers({
  shops: shopsReducer,
  pages: pagesReducer,
  productDetails: productDetailSlice,
  homes: homeSlice,
  carts: cartSlice,
  users: userSlice,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
