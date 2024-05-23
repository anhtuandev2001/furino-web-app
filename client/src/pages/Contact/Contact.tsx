import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { HeadingPage } from '../../common';
import { contactAction, selectContactStatus } from '../../store/contact/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';

function Contact() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),
      email: Yup.string()
        // .matches(, 'Must be only digits')
        .required('Required'),
      message: Yup.string()
        .min(5, 'Must be exactly 5 digits')
        .max(100, 'Must be exactly 1000 digits')
        .required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(contactAction.onSend(values));
    },
  });

  const status = useAppSelector(selectContactStatus);

  useEffect(() => {
    if (status === 'succeeded') {
      formik.resetForm();
    }
  }, [formik, status]);

  return (
    <div className='max-w-[481px] mx-auto px-4'>
      <HeadingPage title='Contact Us' />
      <div>
        <h3 className='font-bold pb-8'>Hours</h3>
        <div>
          <p>Monday – Friday: 10:00am – 7:30pm</p>
          <p>Saturday: 10:00am – 6:00pm</p>
          <p>Sunday: 11:00am – 6:00pm</p>
        </div>
      </div>
      <div className='my-[64px]'>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col gap-[20px]'
        >
          <div className='flex md:justify-between gap-4 flex-col md:flex-row'>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              id='name'
              label='Name'
              variant='outlined'
              sx={{ width: '100%' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              id='email'
              label='Email'
              variant='outlined'
              sx={{ width: '100%' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
            />
          </div>
          <TextField
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            id='phone'
            label='Phone Number'
            type='phone'
            variant='outlined'
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            helperText={
              formik.touched.phone && formik.errors.phone && formik.errors.phone
            }
          />
          <TextField
            error={Boolean(formik.touched.message && formik.errors.message)}
            id='message'
            label='Massage'
            variant='outlined'
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            helperText={
              formik.touched.message &&
              formik.errors.message &&
              formik.errors.message
            }
          />
          <div>
            <LoadingButton
              loading={status === 'loading'}
              type='submit'
              sx={{ marginTop: '20px', width: { xs: '100%', md: 'unset' } }}
              variant='contained'
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
