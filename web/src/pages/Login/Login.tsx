import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, userActions } from '../../store/user/slice';

export default function Login() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      userActions.loginUser({
        email: data.get('email') as string,
        password: data.get('password') as string,
      })
    );
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            sx={{ outline: 'black' }}
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            sx={{ outline: 'black' }}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                value='remember'
                color='primary'
              />
            }
            label='Remember me'
          /> */}
          <LoadingButton
            fullWidth
            type='submit'
            sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white' }}
            loading={user.status === 'loading'}
            variant='contained'
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid
              item
              xs
            >
              {/* <Link
                href='#'
                variant='body2'
              >
                Forgot password?
              </Link> */}
            </Grid>
            <div className='flex flex-col gap-2 items-end'>
              <Link
                href='/sign-up'
                variant='body2'
                sx={{ color: 'black' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
              <Link
                href='/'
                variant='body2'
                sx={{ color: 'black' }}
              >
                {'Back to Home Page'}
              </Link>
            </div>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
