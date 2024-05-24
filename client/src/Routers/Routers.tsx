import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from '../App';
import {
  About,
  Cart,
  Checkout,
  Contact,
  Home,
  Login,
  Notification,
  Order,
  OrderDetail,
  ProductDetail,
  Search,
  Shop,
  SignUp,
  User,
} from '../pages';
import checkTokenExistence from '../utils/hooks/checkToken';
const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = checkTokenExistence(false);
    if (token && (pathname === '/login' || pathname === '/sign-up')) {
      window.location.href = '/';
    }
  }, [pathname]);

  return (
    <Routes>
      <Route
        path='/'
        element={<App />}
      >
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/shop'
          element={<Shop />}
        />
        <Route
          path='/shop/product/:id'
          element={<ProductDetail />}
        />
        <Route
          path='/user'
          element={<User />}
        />

        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />

        <Route
          path='/search'
          element={<Search />}
        />

        <Route
          path='/about'
          element={<About />}
        />

        <Route
          path='/notification'
          element={<Notification />}
        />
        {/* <Route
          path='*'
        element={<ErrorPage />} */}
        {/* /> */}
      </Route>
      <Route
        path='/checkout'
        element={<Checkout />}
      />
      <Route
        path='/order'
        element={<Order />}
      />
      <Route
        path='/order/:orderId'
        element={<OrderDetail />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/sign-up'
        element={<SignUp />}
      />
    </Routes>
  );
};

export default Routers;
