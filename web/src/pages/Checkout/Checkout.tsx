import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Checkbox, Radio, Skeleton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Breadcrumb, CircularProgress, HeaderMobile } from '../../common';
import ComboBox from '../../common/ComboBox/ComboBox';
import Commit from '../../common/Commit/Commit';
import { selectCartSelected } from '../../store/cart/slice';
import {
  orderActions,
  selectDistrict,
  selectProvince,
  selectProvinceSelected,
  selectStatusCheckout,
  selectWard,
} from '../../store/order/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { selectUser, userActions } from '../../store/user/slice';

function Checkout() {
  const [error, setError] = useState(false);
  const [selectedValue, setSelectedValue] = useState('old');
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const progress = useMotionValue(90);

  const provinces = useAppSelector(selectProvince);
  const districts = useAppSelector(selectDistrict);
  const wards = useAppSelector(selectWard);
  const provinceSelected = useAppSelector(selectProvinceSelected);
  const cartSelected = useAppSelector(selectCartSelected);
  const status = useAppSelector(selectStatusCheckout);
  const user = useAppSelector(selectUser);
  const address = JSON.parse(user?.data.address || '{}');
  const delivery = 5.0;

  const screenWidth = window.innerWidth;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      phone: Yup.string()
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

      const data = {
        address: values.address,
        province: provinceSelected.province.provinceName as string,
        district: provinceSelected.district.districtName as string,
        ward: provinceSelected.ward.wardName as string,
        phone: values.phone,
        carts: cartSelected.map((cart: any) => Number(cart.cartId)) as number[],
        firstName: values.firstName,
        lastName: values.lastName,
        save: checked,
      };
      // if (checked) {
      //   localStorage.setItem('address', JSON.stringify(data));
      // }
      dispatch(orderActions.onHandleCheckout(data));
    },
  });

  useEffect(() => {
    if (cartSelected.length === 0) {
      navigate('/shop', { replace: true });
    }
  }, [cartSelected, navigate]);

  const handleSubmit = () => {
    if (address && selectedValue === 'old') {
      dispatch(
        orderActions.onHandleCheckout({
          ...address,
          carts: cartSelected.map((cart: any) =>
            Number(cart.cartId)
          ) as number[],
        })
      );
      return;
    }
    formik.handleSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    dispatch(orderActions.getProvince());
    dispatch(userActions.getUser());
  }, [dispatch]);

  const OrderSuccessPage = () => (
    <div className='flex flex-col justify-center items-center h-screen gap-2'>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress }}
        transition={{ duration: 1 }}
      />
      <CircularProgress progress={progress} />
      <span className='text-[24px]'>Order Confirmed!</span>
      <span>Thank you for your purchase!</span>
      <Button
        sx={{
          textTransform: 'capitalize',
          color: 'white',
          backgroundColor: '#2baf2b',
          marginTop: '20px',
          '&:hover': {
            backgroundColor: '#2baf2b',
          },
        }}
        onClick={() => navigate('/shop', { replace: true })}
      >
        Continue Shopping
      </Button>
    </div>
  );

  // if (status === 'succeeded') {
  return <OrderSuccessPage />;
  // }

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

      <div className='container sm:mx-auto sm:mt-[98px] transition-all h-[100vh]'>
        <HeaderMobile title='Checkout' />

        <div>
          <Radio
            checked={selectedValue === 'old'}
            onChange={handleChange}
            value='old'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'old' }}
          />
          <span>Address Default</span>
          {user.status === 'loading' ? (
            <div className='shadow-md rounded-xl mx-4'>
              <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </div>
              <div className='py-[10px] px-[20px]'>
                <Skeleton width={100} />
              </div>
            </div>
          ) : (
            <div className='shadow-md rounded-xl mx-4'>
              <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                <span className='text-[18px]'>
                  {address.lastName + ' ' + address.firstName}
                </span>
                <span>{address.phone}</span>
              </div>
              <div className='py-[10px] px-[20px]'>
                <p className='text-[#909090]'>
                  {`${address.address}, ${address.ward}, ${address.district}, ${address.province}`}
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <Radio
            checked={selectedValue === 'new'}
            onChange={handleChange}
            value='new'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'new' }}
          />
          <span>New Address</span>
        </div>
        <div
          className={`sm:w-1/3 flex flex-col gap-4 px-4 overflow-hidden transition-all ${
            selectedValue === 'old' ? 'h-0' : 'h-auto'
          }`}
        >
          <div className='flex justify-between gap-4 mt-4'>
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
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
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
              dispatch(orderActions.onHandleChangeProvince(value));
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
              dispatch(orderActions.onHandleChangeDistrict(value));
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
              dispatch(orderActions.onHandleChangeWard(value));
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
          <div>
            <Checkbox
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <span>Save address</span>
          </div>
        </div>
        <div className='sm:w-1/4 flex flex-col mb-[20px] flex-1 px-4 justify-between'>
          <div className='flex gap-4 flex-col'>
            <div className='flex justify-between'>
              <span className='text-[24px] hidden sm:block font-medium'>
                Product
              </span>
              <span className='text-[24px] hidden sm:block font-medium'>
                Total
              </span>
            </div>
            <div className='overflow-scroll'>
              {cartSelected &&
                cartSelected.map((cart: any) => (
                  <div
                    key={cart.cartId}
                    className='flex gap-7 shadow-md m-2 p-2 rounded-xl'
                  >
                    <img
                      src={cart.productImage}
                      alt='cart image'
                      className='h-[100px] w-[100px]'
                    />
                    <div className='flex-1'>
                      <span>{cart.productName}</span>
                      <div className='flex flex-col'>
                        <span>{`${cart.productColor.name}, ${cart.productSize.name}`}</span>
                        <span>x{cart.quantity}</span>
                      </div>
                    </div>
                    <span>{cart.price}$</span>
                  </div>
                ))}
            </div>
            <div className='flex flex-col justify-between p-4 shadow-md rounded-xl'>
              <div className='flex justify-between'>
                <span className='text-[#909090] text-[18px]'>Order:</span>
                <span>
                  {cartSelected &&
                    cartSelected.reduce(
                      (acc: any, item: any) =>
                        Number(acc) + item.quantity * Number(item.price),
                      0
                    )}
                  $
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#909090] text-[18px]'>Delivery:</span>
                <span className=''>{delivery}$</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#909090] text-[18px]'>Total:</span>
                <span className=''>
                  {cartSelected &&
                    cartSelected.reduce(
                      (acc: any, item: any) =>
                        Number(acc) + item.quantity * Number(item.price),
                      0
                    ) + delivery}
                  $
                </span>
              </div>
            </div>
          </div>
          <div className='flex justify-center sm:justify-end pb-5'>
            <LoadingButton
              loading={status === 'loading'}
              sx={{
                width: { xs: '100%', sm: 'fit-content' },
                marginTop: '20px',
                backgroundColor: 'black',
                color: 'white',
              }}
              onClick={handleSubmit}
              variant='contained'
            >
              Checkout
            </LoadingButton>
          </div>
        </div>
      </div>
      {screenWidth > 768 ? <Commit /> : <></>}
    </>
  );
}

export default Checkout;
