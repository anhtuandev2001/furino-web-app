import { combineReducers, type Action } from '@reduxjs/toolkit';
import commonReducer from '../common/slice';
import productDetailSlice from '../productDetail/slice';
import shopsReducer from '../shop/slice';
import userSlice from '../user/slice';
import cartSlice from '../cart/slice';
import homeSlice from '../home/slice';
import checkoutSlide from '../order/slice';
import contactSlide from '../contact/slice';

const appReducer = combineReducers({
  shops: shopsReducer,
  commons: commonReducer,
  productDetails: productDetailSlice,
  homes: homeSlice,
  carts: cartSlice,
  users: userSlice,
  checkouts: checkoutSlide,
  contacts: contactSlide,
});

const rootReducer = (
  state: any,
  action: Action
): ReturnType<typeof appReducer> => {
  return appReducer(state, action);
};

export default rootReducer;
