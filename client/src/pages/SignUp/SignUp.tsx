import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa6';
import { IoIosEye } from 'react-icons/io';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectStatus, userActions } from '../../store/user/slice';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Must be exactly 10 digits')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .matches(/^(?=.*[A-Z])/, 'Must start with an uppercase letter')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(
          /^(?=.*[!@#$%^&*])/,
          'Must contain at least one special character'
        )
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const data = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      dispatch(userActions.register(data));
    },
  });

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
        <img
          src={logo}
          alt='logo'
        />
        <Typography
          component='h1'
          variant='h5'
        >
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name='phone'
                label='Phone'
                type='tel'
                id='phone'
                autoComplete='tel'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ position: 'relative' }}
            >
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='new-password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 0,
                }}
              >
                {showPassword ? (
                  <FaEyeSlash className='text-black' />
                ) : (
                  <IoIosEye className='text-black' />
                )}
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type={showPassword ? 'text' : 'password'}
                id='confirmPassword'
                autoComplete='new-password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={status.register === 'loading'}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid
            container
            justifyContent='flex-end'
          >
            <Grid item>
              <Link
                href='/login'
                variant='body2'
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
