import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from '../App';
import { Home, Login, ProductDetail, Shop, SignUp } from '../pages';
import checkTokenExistence from '../utils/hooks/checkToken';

const Routers = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = checkTokenExistence(false);
    if ((token && pathname === '/login') || pathname === '/sign-up') {
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
          path='shop/product/:id'
          element={<ProductDetail />}
        />

        {/* <Route
          path='*'
          element={<ErrorPage />} */}
        {/* /> */}
      </Route>

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