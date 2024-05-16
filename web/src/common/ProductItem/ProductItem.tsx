import 'animate.css';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ProductProp } from '../../types/product';

function ProductItem({
  item,
  onSetProductDetail,
}: {
  item: ProductProp;
  onSetProductDetail: (item: ProductProp) => void;
}) {
  return (
    <Link
      to={`/shop/product/${item.productId}`}
      key={uuid()}
      onClick={() => onSetProductDetail(item)}
      className='flex flex-col relative group rounded'
    >
      <div className='group-hover:shadow-xl overflow-hidden transition-all duration-300 relative z-20'>
        <img
          src={item.productGeneralImages[0].image}
          alt={item.name}
          className='h-[250px] md:h-[300px] w-full object-cover transform transition-all duration-300 group-hover:scale-105'
        />
      </div>
      {item?.productInventories[0] &&
        item?.productInventories[0]?.priceDiscount && (
          <span className='absolute top-[24px] right-[24px] w-[48px] h-[48px] flex items-center justify-center bg-[#E97171] rounded-full font-medium text-white animate-bounce'>
            -
            {Math.floor(
              ((item.productInventories[0].price -
                item?.productInventories[0].priceDiscount) /
                item.productInventories[0].price) *
                100
            )}
            %
          </span>
        )}
      <div className='flex flex-col mt-[3px]'>
        <span className='text-sm capitalize'>{item.name}</span>
        <div className='flex'>
          {item?.productInventories[0].priceDiscount && (
            <span className=''>
              ${item?.productInventories[0].priceDiscount}
            </span>
          )}
          <span
            className={`${
              !item?.productInventories[0].priceDiscount
                ? 'text-[#3A3A3A] mr-[16px]'
                : 'text-[#B0B0B0]  line-through'
            }`}
          >
            ${item.productInventories[0].price}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
