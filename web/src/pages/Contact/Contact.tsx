import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { Breadcrumb } from '../../common';
import Commit from '../../common/Commit/Commit';
import { list } from '../../utils/constants/contact';
import { useFormik } from 'formik';

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      massage: '',
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
      massage: Yup.string()
        .min(5, 'Must be exactly 5 digits')
        .max(100, 'Must be exactly 1000 digits')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Breadcrumb
        title='Contact'
        part='contact'
      />
      <div className='px-4 sm:container sm:mx-auto'>
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
        <div className='mt-8 flex flex-col gap-8 sm:justify-around sm:flex-row'>
          <div className='sm:w-1/3'>
            {list.map((item) => (
              <div className='flex items-start gap-2'>
                <item.icon size={30} />
                <div>
                  <h3 className= 'text-[20px] tsm:text-[24px] font-medium sm:font-semibold'>{item.name}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='sm:w-2/3'>
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
                error={Boolean(formik.touched.massage && formik.errors.massage)}
                id='massage'
                label='Massage'
                variant='outlined'
                sx={{ width: '100%' }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.massage}
                helperText={
                  formik.touched.massage &&
                  formik.errors.massage &&
                  formik.errors.massage
                }
              />
              <Button
                type='submit'
                variant='contained'
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Commit />
    </>
  );
}

export default Contact;
