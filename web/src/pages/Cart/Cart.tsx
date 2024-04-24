import { useEffect, useState } from 'react';
import { cartActions, selectCarts } from '../../store/cart/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import CartDesktop from './CartDesktop';
import CartMobile from './CartMobile';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState<any>([]);
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
      setSelect(select.filter((item: any) => item.cartId !== cart.cartId));
    } else {
      setSelect([...select, cart]);
    }
  };

  const handleCheckout = () => {
    dispatch(cartActions.onHandleCheckout(select));
    navigate('/checkout');
  };

  useEffect(() => {
    dispatch(cartActions.getCarts());
  }, [dispatch]);

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
        />
      )}
    </div>
  );
}

export default Cart;
