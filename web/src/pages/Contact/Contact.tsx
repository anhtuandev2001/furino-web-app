import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Breadcrumb } from '../../common';
import Commit from '../../common/Commit/Commit';
import { contactAction, selectContactStatus } from '../../store/contact/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { list } from '../../utils/constants/contact';
import { useEffect } from 'react';

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
    <div className='container'>
      <Breadcrumb
        title='Contact'
        part='contact'
      />
      <div className='px-4'>
        <div className='text-center'>
          <h2 className='text-[30px] font-semibold mt-4'>
            Get In Touch With Us
          </h2>
          <p className='text-[#9F9F9F] text-[14px]'>
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className='mt-8 flex flex-col gap-8 md:justify-around md:flex-row md:mt-10'>
          <div className='md:w-1/3'>
            {list.map((item) => (
              <div className='flex items-start gap-2'>
                <item.icon size={30} />
                <div>
                  <h3 className='text-[20px] tsm:text-[24px] font-medium md:font-semibold'>
                    {item.name}
                  </h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='md:w-1/3'>
            <form
              onSubmit={formik.handleSubmit}
              className='flex flex-col gap-[20px]'
            >
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
                  formik.touched.name &&
                  formik.errors.name &&
                  formik.errors.name
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
                  formik.touched.phone &&
                  formik.errors.phone &&
                  formik.errors.phone
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
              <LoadingButton
                loading={status === 'loading'}
                type='submit'
                variant='contained'
              >
                Submit
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
      <Commit />
    </div>
  );
}

export default Contact;
