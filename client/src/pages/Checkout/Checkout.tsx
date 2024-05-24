import LoadingButton from '@mui/lab/LoadingButton';
import { Checkbox, Radio, Skeleton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { HeaderMobile, HeadingPage, OrderSuccessPage } from '../../common';
import ComboBox from '../../common/ComboBox/ComboBox';
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
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const provinces = useAppSelector(selectProvince);
  const districts = useAppSelector(selectDistrict);
  const wards = useAppSelector(selectWard);
  const provinceSelected = useAppSelector(selectProvinceSelected);
  const cartSelected = useAppSelector(selectCartSelected);
  const status = useAppSelector(selectStatusCheckout);
  const user = useAppSelector(selectUser);
  const address = JSON.parse(user?.data.address || null);
  const [selectedValue, setSelectedValue] = useState(address ? 'old' : 'new');

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

    return () => {
      dispatch(orderActions.clearStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (user.status === 'succeeded' && user.data.address) {
      setSelectedValue('old');
    }
  }, [user]);

  if (status === 'succeeded') {
    return <OrderSuccessPage />;
  }

  return (
    <div className='container px-4'>
      <div className='md:mt-[40px] transition-all h-[100vh]'>
        <HeaderMobile title='Checkout' />
        <div className='hidden md:block'>
          <HeadingPage title='Checkout' continueShopping/>
        </div>
        <div className='flex flex-col md:flex-row gap-[40px]'>
          <div className='md:w-1/2'>
            <Radio
              checked={selectedValue === 'old'}
              onChange={handleChange}
              disabled={!address}
              value='old'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'old' }}
            />
            <span>Address Default</span>
            {user.status === 'loading' ? (
              <div className='shadow-md rounded-xl'>
                <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                  <Skeleton width={100} />
                  <Skeleton width={100} />
                </div>
                <div className='py-[10px] px-[20px]'>
                  <Skeleton width={100} />
                </div>
              </div>
            ) : (
              <div className='shadow-md rounded-xl'>
                <div className='flex justify-between py-[10px] px-[20px] border-b-4 border-[#F0F0F0]'>
                  <span className='text-[18px]'>
                    {(address?.lastName || '') + ' ' + (address?.firstName || '')}
                  </span>
                  <span>{address?.phone || ''}</span>
                </div>
                <div className='py-[10px] px-[20px]'>
                  <p className='text-[#909090]'>
                    {address
                      ? `${address.address}, ${address.ward}, ${address.district}, ${address.province}`
                      : ''}
                  </p>
                </div>
              </div>
            )}
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
              className={`flex flex-col gap-4 overflow-hidden transition-all ${
                selectedValue === 'old' ? 'h-0 md:h-auto' : 'h-auto'
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
          </div>
          <div>
            <div className='text-sm flex text-subText pb-5 border-b-2 md:border-b md:grid md:grid-cols-12 gap-4'>
              <span className='col-span-8'>PRODUCT</span>
              <span className='hidden md:block md:col-span-1'>QUANTITY</span>
              <span className='md:col-span-2 text-right flex-1'>TOTAL</span>
            </div>
            <div className='flex flex-col gap-10 my-10 border-b pb-10'>
              {cartSelected.map((cart: any) => (
                <div
                  className='flex gap-4 md:grid md:grid-cols-12'
                  key={uuidv4()}
                >
                  <img
                    src={cart.productImage}
                    alt='product'
                    className='h-[74px] w-[74px] object-cover md:w-[100px] md:h-[100px] md:col-span-1'
                  />
                  <div className='flex md:ml-6 flex-col gap-2 md:col-span-9 md:grid md:grid-cols-9 md:gap-0 flex-1'>
                    <div className='md:col-span-7'>
                      <h3>{cart.productName}</h3>
                      <span className='text-sm text-subText'>
                        {`Color: ${cart.productColor.name}, Size: ${cart.productSize.name}`}
                      </span>
                    </div>
                    <div className='flex gap-2 md:col-span-2'>
                      <div>
                        <div className='flex items-center gap-2'>
                          x{cart.quantity}
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className='col-span-1 text-right'>
                    ${cart.price * cart.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-8 flex gap-4 flex-col justify-center md:items-end text-center md:text-right'>
              <h3>
                Subtotal: $
                {cartSelected.reduce(
                  (acc: number, item: { price: number; quantity: number }) =>
                    acc + item.price * item.quantity,
                  0
                )}
              </h3>
              <h4 className='text-sm'>
                Taxes and shipping calculated at checkout
              </h4>
              <LoadingButton
                loading={status === 'loading'}
                variant='contained'
                className='md:w-[360px]'
                sx={{ marginBottom: '40px' }}
                onClick={handleSubmit}
              >
                Pay now
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
