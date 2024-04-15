import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { LuUser, LuUserMinus } from 'react-icons/lu';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import logo from '../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, userActions } from '../../store/user/slice';
import { links } from '../../utils/constants/link';
import { settings } from '../../utils/constants/menu';
import checkTokenExistence from '../../utils/hooks/checkToken';
import CartPreview from '../CartPreview/CartPreview';
import AlertDialog from '../AlertDialog/AlertDialog';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openCart, setOpenCart] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUser = (setting: any) => {
    if (setting.name === 'Logout') {
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = (type: string) => {
    if (type === 'agree') {
      dispatch(userActions.logoutUser());
    }
    setOpenAlert(false);
  };
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt='logo'
            />
            FURNIRO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((page) => (
                <MenuItem
                  key={uuid()}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    className='text-back'
                    to={page.path}
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt='logo'
            />
            FURNIRO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {links.map((page) => (
              <Button
                key={uuid()}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  className='text-black'
                  to={page.path}
                >
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={() => {
                const token = checkTokenExistence(true);
                if (token) {
                  setOpenCart(true);
                }
              }}
            >
              <MdOutlineShoppingCart
                size={24}
                color='black'
              />
            </Button>

            <Tooltip title='Open settings'>
              <Button onClick={handleOpenUserMenu}>
                {Object.keys(user).length !== 0 ? (
                  <LuUser
                    size={24}
                    color='black'
                  />
                ) : (
                  <LuUserMinus
                    size={24}
                    color='black'
                  />
                )}
              </Button>
            </Tooltip>
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
              {Object.keys(user).length === 0 ? (
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
          </Box>
          {openCart && (
            <CartPreview
              open={openCart}
              onClose={() => {
                setOpenCart(false);
              }}
            />
          )}
        </Toolbar>
        <AlertDialog
          open={openAlert}
          onClose={handleCloseAlert}
          title='Are you sure you want to logout?'
          content='Are you sure you want to logoutƒ'
        />
      </Container>
    </AppBar>
  );
}
export default NavBar;