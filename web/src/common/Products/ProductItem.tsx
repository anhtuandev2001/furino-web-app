import 'animate.css';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ProductProp } from '../../types/product';

function ProductItem({ item }: { item: ProductProp }) {
  return (
    <Link
      to={`/shop/product/${item.productId}`}
      key={uuid()}
      className='flex flex-col relative group rounded'
    >
      <div className='overflow-hidden'>
        <img
          src={item.productGeneralImages[0].image}
          alt={item.name}
          className='h-[250px] md:h-[300px] w-full object-cover transform transition-all duration-500 group-hover:scale-105'
        />
      </div>
      {item?.productInventories[0].priceDiscount && (
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
      <div className='flex flex-col gap-2 sm:gap-[8px] pt-[16px] px-[16px] pb-[15px] sm:pb-[30px] bg-[#F4F5F7]'>
        <span className='text-[#3A3A3A] font-semibold text-[24px] capitalize'>
          {item.name}
        </span>
        <div className='flex gap-2'>
          {item.productCategories &&
            item.productCategories.map((category) => (
              <span
                key={uuid()}
                className='text-[#898989] text-[16px] capitalize'
              >
                {category.category.name}
              </span>
            ))}
        </div>
        <div className='flex'>
          {item?.productInventories[0].priceDiscount && (
            <span className='text-[#3A3A3A] text-[20px] font-semibold mr-[16px]'>
              ${item?.productInventories[0].priceDiscount}
            </span>
          )}
          <span
            className={`${
              !item?.productInventories[0].priceDiscount
                ? 'text-[#3A3A3A] text-[20px] font-semibold mr-[16px]'
                : 'text-[#B0B0B0] text-[16px] line-through'
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
