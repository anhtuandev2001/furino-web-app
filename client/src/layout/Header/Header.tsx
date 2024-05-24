import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { CartNotification, CustomizedBadges } from '../../common';
import AlertDialog from '../../common/AlertDialog/AlertDialog';
import {
  cartActions,
  selectActions,
  selectCarts,
  selectShowCartNotification,
} from '../../store/cart/slice';
import { selectHiddenNavHeader } from '../../store/common/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, userActions } from '../../store/user/slice';
import { links } from '../../utils/constants/link';
import { settings } from '../../utils/constants/menu';
import checkTokenExistence from '../../utils/hooks/checkToken';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openAlert, setOpenAlert] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const cartStatus = useAppSelector(selectActions);
  const cart = useAppSelector(selectCarts);
  const cartNotification = useAppSelector(selectShowCartNotification);

  const hiddenNavHeader = useAppSelector(selectHiddenNavHeader);
  const headerRef = useRef<any>(null);
  // const lastScrollPos = useRef(window.pageYOffset);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;

  //     console.log(currentScrollPos);

  //     if (headerRef.current) {
  //       const isScrollingDown = currentScrollPos > lastScrollPos.current;
  //       window.requestAnimationFrame(() => {
  //         // headerRef.current!.classList.toggle('fixed', !isScrollingDown);
  //       });
  //     }

  //     lastScrollPos.current = currentScrollPos;
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUser = (setting: any) => {
    switch (setting.name) {
      case 'Logout':
        setOpenAlert(true);
        break;
      case 'Profile':
        navigate(setting.path);
        break;
      case 'Order':
        navigate(setting.path);
        break;
      default:
        break;
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleSubmit = () => {
    dispatch(userActions.logoutUser());
    handleCloseAlert();
  };

  const handleCloseCartNotification = () => {
    dispatch(cartActions.hideCartNotification());
  };

  const handleCheckout = (cart: any) => {
    dispatch(cartActions.onHandleCheckout([cart]));
  };

  React.useEffect(() => {
    if (user.data.userId && cart.status === 'idle') {
      dispatch(cartActions.getCarts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !hiddenNavHeader && (
      <header
        ref={headerRef}
        className='top-0 h-[62px] fixed left-0 right-0 bg-white border-b z-[1000]'
      >
        <div>
          <div className='py-3 md:py-0 container px-4'>
            <div className='grid grid-cols-3 items-center'>
              <Link
                to='/'
                className='col-start-2 flex col-span-1 font-[monospace] md:col-start-1 items-center text-[27px] font-semibold letter-spacing-[0.3rem] text-black hover:text-black hover:no-underline'
              >
                FURINO
              </Link>
              <div className='flex-grow hidden md:flex justify-center'>
                {links.map((page) => (
                  <Button
                    key={uuid()}
                    sx={{ my: 2, color: 'white', display: 'block', padding: 0 }}
                  >
                    <Link
                      className='text-black text-sm font-normal'
                      to={page.path}
                    >
                      {page.title}
                    </Link>
                  </Button>
                ))}
              </div>

              <div className='flex md:gap-[20px] justify-end items-center'>
                <IconButton
                  aria-label='search'
                  onClick={() => navigate('/search')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M13.0108 13.7179C11.7372 14.8278 10.0721 15.5 8.25 15.5C4.24594 15.5 1 12.2541 1 8.25C1 4.24594 4.24594 1 8.25 1C12.2541 1 15.5 4.24594 15.5 8.25C15.5 10.0721 14.8278 11.7372 13.7179 13.0108L19.8536 19.1464L19.1464 19.8536L13.0108 13.7179ZM14.5 8.25C14.5 11.7018 11.7018 14.5 8.25 14.5C4.79822 14.5 2 11.7018 2 8.25C2 4.79822 4.79822 2 8.25 2C11.7018 2 14.5 4.79822 14.5 8.25Z'
                      fill='black'
                    />
                  </svg>
                </IconButton>
                <div className='hidden md:block'>
                  <IconButton
                    aria-label='user'
                    onClick={handleOpenUserMenu}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M7.5 5C7.5 4.20435 7.81607 3.44129 8.37868 2.87868C8.94129 2.31607 9.70435 2 10.5 2C11.2956 2 12.0587 2.31607 12.6213 2.87868C13.1839 3.44129 13.5 4.20435 13.5 5C13.5 5.79565 13.1839 6.55871 12.6213 7.12132C12.0587 7.68393 11.2956 8 10.5 8C9.70435 8 8.94129 7.68393 8.37868 7.12132C7.81607 6.55871 7.5 5.79565 7.5 5ZM10.5 1C9.43913 1 8.42172 1.42143 7.67157 2.17157C6.92143 2.92172 6.5 3.93913 6.5 5C6.5 6.06087 6.92143 7.07828 7.67157 7.82843C8.42172 8.57857 9.43913 9 10.5 9C11.5609 9 12.5783 8.57857 13.3284 7.82843C14.0786 7.07828 14.5 6.06087 14.5 5C14.5 3.93913 14.0786 2.92172 13.3284 2.17157C12.5783 1.42143 11.5609 1 10.5 1ZM16.08 13.15C17.2 13.97 17.91 15.39 17.99 18H3.01C3.09 15.4 3.8 13.97 4.91 13.15C6.16 12.25 8 12 10.5 12C13 12 14.85 12.26 16.08 13.15ZM10.5 11C8 11 5.85 11.24 4.33 12.35C2.77 13.48 2 15.43 2 18.5V19H19V18.5C19 15.43 18.23 13.48 16.67 12.35C15.15 11.25 13 11 10.5 11Z'
                        fill='black'
                      />
                    </svg>
                  </IconButton>
                </div>
                <CustomizedBadges
                  token={checkTokenExistence()}
                  total={cart.data.length}
                  className={`relative ${
                    cartStatus.add === 'succeeded'
                      ? 'animate__animated animate__headShake'
                      : ''
                  }`}
                />
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!user.data.userId ? (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/login'>Login</Link>
                    </MenuItem>
                  ) : (
                    settings.map((setting) => (
                      <MenuItem
                        key={uuid()}
                        onClick={handleCloseUserMenu}
                      >
                        <span onClick={() => handleUser(setting)}>
                          {setting.name}
                        </span>
                      </MenuItem>
                    ))
                  )}
                </Menu>
              </div>
            </div>
            <AlertDialog
              open={openAlert}
              onClose={handleCloseAlert}
              title='Are you sure you want to logout?'
              content='Are you sure you want to logout!'
              onConfirm={handleSubmit}
            />
          </div>
        </div>
        {cartNotification.show && (
          <CartNotification
            cartNotification={cartNotification}
            onClose={handleCloseCartNotification}
            onCheckout={handleCheckout}
          />
        )}
      </header>
    )
  );
};

export default Header;
