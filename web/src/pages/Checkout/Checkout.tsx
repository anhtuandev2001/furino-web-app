import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Breadcrumb, ButtonCustom } from '../../common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ComboBox from '../../common/ComboBox/ComboBox';
import Commit from '../../common/Commit/Commit';
import { selectCartSelected } from '../../store/cart/slice';
import {
  checkoutActions,
  selectDistrict,
  selectProvince,
  selectProvinceSelected,
  selectWard,
} from '../../store/checkout/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const provinces = useAppSelector(selectProvince);
  const districts = useAppSelector(selectDistrict);
  const wards = useAppSelector(selectWard);
  const provinceSelected = useAppSelector(selectProvinceSelected);
  const cartSelected = useAppSelector(selectCartSelected);

  useEffect(() => {
    dispatch(checkoutActions.getProvince());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),
      address: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      if (
        !provinceSelected.province ||
        !provinceSelected.district ||
        !provinceSelected.ward
      ) {
        setError(true);
        return;
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(cartSelected);

  useEffect(() => {
    if (cartSelected.length === 0) {
      navigate('/shop', { replace: true });
    }
  }, [cartSelected, navigate]);

  const screenWidth = window.innerWidth;

  return (
    <>
      {screenWidth > 768 ? (
        <Breadcrumb
          title='Checkout'
          part='checkout'
        />
      ) : (
        <> </>
      )}

      <div className='container sm:mx-auto sm:mt-[98px] h-[100vh]'>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col sm:flex-row gap-[20px] sm:gap-[90px] justify-center h-full sm:h-auto'
        >
          <div className='text-center py-4 relative '>
            <Button
              startIcon={<ArrowBackIcon sx={{ color: 'black' }} />}
              onClick={() => window.history.back()}
              sx={{ width: 'fit-content', position: 'absolute', left: 0 }}
              className='col-span-1'
            />
            <span className='text-[24px] font-semibold'>Checkout</span>
          </div>
          <div className='sm:w-1/3 flex flex-col gap-4 px-4'>
            <div className='flex py-4 justify-between gap-4'>
              <TextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                id='firstName'
                label='First Name'
                variant='outlined'
                sx={{ width: '100%' }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                helperText={
                  formik.touched.firstName &&
                  formik.errors.firstName &&
                  formik.errors.firstName
                }
              />
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                id='lastName'
                label='Last Name'
                variant='outlined'
                sx={{ width: '100%' }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                helperText={
                  formik.touched.lastName &&
                  formik.errors.lastName &&
                  formik.errors.lastName
                }
              />
            </div>
            <TextField
              error={Boolean(
                formik.touched.phoneNumber && formik.errors.phoneNumber
              )}
              id='phoneNumber'
              label='Phone Number'
              type='phone'
              variant='outlined'
              sx={{ width: '100%' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              helperText={
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber &&
                formik.errors.phoneNumber
              }
            />
            <ComboBox
              error={error}
              sx={{ width: '100%' }}
              label='Province'
              list={
                provinces.status === 'succeeded'
                  ? provinces.data.map((province: any) => ({
                      label: province.province_name,
                      province_id: province.province_id,
                    }))
                  : []
              }
              isOptionEqualToValue={(option: any, value: any) =>
                option.province_id === value.province_id
              }
              multiple={false}
              onChange={(value: any) => {
                dispatch(checkoutActions.onHandleChangeProvince(value));
              }}
            />
            <ComboBox
              error={error}
              sx={{ width: '100%' }}
              label='District'
              list={
                districts.status === 'succeeded'
                  ? districts.data.map((district: any) => ({
                      label: district.district_name,
                      district_id: district.district_id,
                    }))
                  : []
              }
              isOptionEqualToValue={(option: any, value: any) =>
                option.district_id === value.district_id
              }
              multiple={false}
              onChange={(value: any) => {
                dispatch(checkoutActions.onHandleChangeDistrict(value));
              }}
            />
            <ComboBox
              error={error}
              sx={{ width: '100%' }}
              label='Ward'
              list={
                wards.status === 'succeeded'
                  ? wards.data.map((ward: any) => ({
                      label: ward.ward_name,
                      ward_id: ward.ward_id,
                    }))
                  : []
              }
              isOptionEqualToValue={(option: any, value: any) =>
                option.ward_id === value.ward_id
              }
              multiple={false}
              onChange={(value: any) => {
                dispatch(checkoutActions.onHandleChangeWard(value));
              }}
            />
            <TextField
              error={Boolean(formik.touched.address && formik.errors.address)}
              id='address'
              label='Address'
              type='text'
              variant='outlined'
              sx={{ width: '100%' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              helperText={
                formik.touched.address &&
                formik.errors.address &&
                formik.errors.address
              }
            />
          </div>
          <div className='sm:w-1/4 flex flex-col mb-[20px] flex-1 px-4 justify-between'>
            <div className='flex gap-4 flex-col'>
              <div className='flex justify-between'>
                <span className='text-[24px] font-medium'>Product</span>
                <span className='text-[24px] font-medium'>Total</span>
              </div>
              {cartSelected &&
                cartSelected.map((cart: any) => (
                  <div
                    key={cart.cartId}
                    className='flex justify-between'
                  >
                    <span>
                      {`${cart.productName} - ${cart.productColor.name}, ${cart.productSize.name}   x ${cart.quantity}`}
                    </span>
                    <span>{cart.price}$</span>
                  </div>
                ))}
              <div className='flex justify-between'>
                <span>Total</span>
                <span className='text-[24px] text-[#B88E2F] font-bold'>
                  {cartSelected &&
                    cartSelected.reduce(
                      (acc: any, cart: any) => acc + cart.price * cart.quantity,
                      0
                    )}
                  $
                </span>
              </div>
            </div>
            <div className='flex justify-center'>
              <ButtonCustom
                sx={{ width: '100%', marginTop: '20px' }}
                type='submit'
                variant='contained'
              >
                Checkout
              </ButtonCustom>
            </div>
          </div>
        </form>
      </div>
      {screenWidth > 768 ? <Commit /> : <></>}
    </>
  );
}

export default Checkout;
