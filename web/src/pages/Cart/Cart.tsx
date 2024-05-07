import { useEffect, useState } from 'react';
import { cartActions, selectCarts } from '../../store/cart/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import CartDesktop from './CartDesktop';
import CartMobile from './CartMobile';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const screenWidth = window.innerWidth;
  const carts = useAppSelector(selectCarts);

  const handleChangeQuantity = (event: any, cartId: number) => {
    dispatch(cartActions.onHandleUpdateCart({ cartId, quantity: event }));
  };
  const handleDeleteCart = (cartId: number) => {
    dispatch(cartActions.onHandDeleteCart(cartId));
  };
  const handleCheckboxChange = (cart: any) => {
    if (select.some((item: any) => item.cartId === cart.cartId)) {
      const newSelect = select.filter(
        (item: any) => item.cartId !== cart.cartId
      );
      setSelect(newSelect);
    } else {
      const newSelect = [...select, cart];
      setSelect(newSelect);
      if (newSelect.length === carts.data.length) {
        setSelectAll(true);
        return;
      }
    }
    setSelectAll(false);
  };

  const handleCheckout = () => {
    dispatch(cartActions.onHandleCheckout(select));
    navigate('/checkout');
  };

  useEffect(() => {
    dispatch(cartActions.getCarts());
  }, [dispatch]);

  useEffect(() => {
    if (selectAll) {
      setSelect(carts.data);
    } else if (!selectAll && select.length === carts.data.length) {
      setSelect([]);
    }
  }, [selectAll, carts.data, select.length]);

  return (
    <div className='h-[100vh] sm:h-fit'>
      {screenWidth > 768 ? (
        <CartDesktop
          cart={carts}
          select={select}
          handleCheckboxChange={handleCheckboxChange}
          handleChangeQuantity={handleChangeQuantity}
          handleDeleteCart={handleDeleteCart}
          handleCheckout={handleCheckout}
        />
      ) : (
        <CartMobile
          carts={carts}
          select={select}
          handleCheckboxChange={handleCheckboxChange}
          handleChangeQuantity={handleChangeQuantity}
          handleDeleteCart={handleDeleteCart}
          handleCheckout={handleCheckout}
          setSelectAll={setSelectAll}
          selectAll={selectAll}
        />
      )}
    </div>
  );
}

export default Cart;
