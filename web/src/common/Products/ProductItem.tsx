import 'animate.css';
import { Link } from 'react-router-dom';
import { ProductProp } from '../../types/product';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

function ProductItem({ item }: { item: ProductProp }) {
  const [image, setImage] = useState<string>(
  );

  if(!item) return null

  console.log(item);
  
  
  return (
    <Link
      to={`/shop/product/${item.productId}`}
      key={uuid()}
      className='flex flex-col relative group'
      onMouseEnter={() => {
        setImage(
          item.productGeneralImages[1].image
            ? item.productGeneralImages[1].image
            : item.productImages[0].image
        );
      }}
      onMouseLeave={() => {
        setImage(item.productGeneralImages[0].image);
      }}
    >
      <div className='overflow-hidden'>
        <img
          src={image}
          alt={item.name}
          className='h-[200px] sm:h-[300px] object-cover transform transition-all duration-500 group-hover:scale-105'
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
      <div className='flex flex-col gap-[8px] pt-[16px] px-[16px] pb-[30px] bg-[#F4F5F7]'>
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
