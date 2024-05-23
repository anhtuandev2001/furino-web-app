// import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({
  children,
//   routeType,
}: {
  children: any;
  routeType: string;
}) => {
//   const location = useLocation(); // Import useLocation

//   if (routeType === 'private' && !token) {
//     return (
//       <Navigate
//         to='/login'
//         replace
//       />
//     );
//   }

//   if (
//     routeType === 'private' &&
//     user?.role?.roleId == 1 &&
//     location.pathname == '/account'
//   ) {
//     return (
//       <Navigate
//         to='/product'
//         replace
//       />
//     );
//   }

//   if (
//     routeType === 'private' &&
//     user?.role?.roleId === 2 &&
//     location.pathname !== '/order'
//   ) {
//     return (
//       <Navigate
//         to='/order'
//         replace
//       />
//     );
//   }

//   if (
//     routeType === 'public' &&
//     token &&
//     ['/login', '/register'].includes(location.pathname)
//   ) {
//     return (
//       <Navigate
//         to='/'
//         replace
//       />
//     );
//   }

  return children;
};

export default AuthRoute;
