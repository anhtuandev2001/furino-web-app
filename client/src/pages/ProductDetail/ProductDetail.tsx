import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import productNotFound from '../../assets/images/noProducts.png';
import FormRadius from '../../common/FormRadius/FormRadius';
import Products from '../../common/Products/Products';
import QuantityInput from '../../common/QuantityInput/QuantityInput';
import { cartActions, selectActions } from '../../store/cart/slice';
import {
  productDetailActions,
  selectProduct,
  selectProductSuggestion,
} from '../../store/productDetail/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  ProductColor,
  ProductInventoryProps,
  ProductSize,
} from '../../types/product';
import checkTokenExistence from '../../utils/hooks/checkToken';

function ProductDetail() {
  const [size, setSize] = useState('');
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [color, setColor] = useState('');
  const [colors, setColors] = useState<ProductColor[]>();
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<
    { image: string; productColorId?: number }[]
  >([]);
  const [image, setImage] = useState<string>('');
  const product = useAppSelector(selectProduct);
  const productSuggestion = useAppSelector(selectProductSuggestion);
  const [productItem, setProductItem] = useState<ProductInventoryProps>();
  const [imagePosition, setImagePosition] = useState(1);

  const imageRefBody = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const productId = useParams().id;
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectActions);

  const handleChangeSize = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setSize(newAlignment);

    if (color) {
      const selectColor = images.find(
        (item) => item?.productColorId === Number(color)
      )?.image;
      if (selectColor) {
        setImage(selectColor);
      }
    }

    if (newAlignment) {
      const newColors = product.data?.productInventories
        .map((item) => {
          if (item.productSize.productSizeId === Number(newAlignment)) {
            return item.productColor;
          }
          return null;
        })
        .filter((item) => item !== null) as ProductColor[];

      const newColorsSet = new Set(
        newColors.map((color) => color.productColorId)
      );

      const updatedColors =
        colors &&
        colors.map((color) => ({
          ...color,
          disable: !newColorsSet.has(color.productColorId),
        }));

      setColors(updatedColors);
    } else {
      setColors(
        product.data?.productInventories.reduce(
          (unique: ProductColor[], item) => {
            if (
              !unique.some(
                (color) =>
                  color?.productColorId === item.productColor.productColorId
              )
            ) {
              unique.push(item?.productColor);
            }
            return unique;
          },
          []
        )
      );
    }
  };

  const handleChangeColor = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setColor(newAlignment);

    if (newAlignment) {
      imageRefBody.current?.scroll({
        top:
          imageRef.current?.getClientRects()[0].top ??
          0 - imageRefBody.current?.getClientRects()[0].top,
        behavior: 'smooth',
      });

      setImage(
        product.data?.productImages.find(
          (item) => item.productColorId === Number(newAlignment)
        )?.image || ''
      );

      const newSizes = product.data?.productInventories
        .map((item) => {
          if (item.productColor.productColorId === Number(newAlignment)) {
            return item.productSize;
          }
          return null;
        })
        .filter((item) => item !== null) as ProductSize[];

      const newSizesSet = new Set(newSizes.map((size) => size.productSizeId));

      const updatedSizes =
        sizes &&
        sizes.map((color) => ({
          ...color,
          disable: !newSizesSet.has(color.productSizeId),
        }));

      setSizes(updatedSizes);
    } else {
      setSizes(
        product.data?.productInventories.reduce(
          (unique: ProductSize[], item) => {
            if (
              !unique.some(
                (size) => size?.productSizeId === item.productSize.productSizeId
              )
            ) {
              unique.push(item?.productSize);
            }
            return unique;
          },
          []
        ) || []
      );
    }
  };

  const handleAddToCart = () => {
    if (!product.data) return;
    if (!size || !color) return;
    checkTokenExistence();
    const cartData = {
      productId: product.data.productId,
      productSizeId: Number(size),
      productColorId: Number(color),
      quantity,
    };
    dispatch(cartActions.onHandleAddToCart(cartData));
  };

  useEffect(() => {
    if (!product.data || product.status === 'idle') {
      dispatch(productDetailActions.getProduct(Number(productId)));
      return;
    }
    dispatch(productDetailActions.getProductSuggestions(Number(productId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.data) {
      setProductItem(product.data.productInventories[0]);
      setSizes(
        product.data.productInventories
          .reduce((unique: ProductSize[], item) => {
            if (
              !unique.some(
                (size) => size?.productSizeId === item.productSize.productSizeId
              )
            ) {
              unique.push(item?.productSize);
            }
            return unique;
          }, [])
          .sort((a, b) => (a.productSizeId > b.productSizeId ? 1 : -1))
      );
      setColors(
        product.data.productInventories
          .reduce((unique: ProductColor[], item) => {
            if (
              !unique.some(
                (color) =>
                  color?.productColorId === item.productColor.productColorId
              )
            ) {
              unique.push(item?.productColor);
            }
            return unique;
          }, [])
          .sort((a, b) => (a.productColorId > b.productColorId ? 1 : -1))
      );
      const newImage = [
        ...product.data.productGeneralImages,
        ...product.data.productImages,
      ];

      const uniqueImages = newImage.reduce(
        (unique: { image: string; productColorId?: number }[], item) => {
          if (!unique.some((image) => image.image === item.image)) {
            unique.push({
              image: item.image,
            });
          }
          return unique;
        },
        []
      );
      setImages(uniqueImages);
      setImage(product.data.productGeneralImages[0]?.image);
    }
  }, [dispatch, product.data]);

  useEffect(() => {
    if (size && color && product.data) {
      const productItemSelect = product.data.productInventories.find(
        (item) =>
          item?.productSize?.productSizeId === Number(size) &&
          item?.productColor?.productColorId === Number(color)
      );
      if (productItemSelect) {
        setProductItem(productItemSelect);
      }
    }
  }, [color, product.data, size]);


  return (
    <div className='md:py-16 relative container px-4'>
      <div className='flex flex-col md:flex-row md:gap-10'>
        {product.status === 'loading' ? (
          <>
            <div className='md:w-7/12 lg:w-2/3 flex-col gap-4 md:gap-[32px] md:flex-row'>
              <div className='flex-1'>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height='100%'
                  className='hidden md:block aspect-square object-cover rounded-lg'
                />
              </div>
              <div
                ref={imageRefBody}
                className='hidden md:snap-none overflow-hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-[10px] mt-[10px]'
              >
                {Array.from({ length: 2 }).map(() => (
                  <Skeleton
                    key={uuidv4()}
                    variant='rectangular'
                    width='100%'
                    height='100%'
                    className='snap-center aspect-square col-span-1 md:h-auto object-cover rounded-sm cursor-pointer'
                  />
                ))}
              </div>
              <div className='md:hidden p-3 w-[138px]  mt-3 mb-10'></div>
            </div>
            <div className='md:w-5/12 lg:w-1/3'>
              <div className='justify-end md:justify-normal sticky top-[61px] flex flex-col gap-4 md:gap-[18px]'>
                <Skeleton
                  variant='text'
                  width='100%'
                  height='40px'
                />
                <Skeleton
                  variant='text'
                  width='100%'
                  height='40px'
                />
                <div className='flex gap-3 items-center'></div>
                <Skeleton
                  variant='text'
                  width='100%'
                  height='40px'
                />
                <Skeleton
                  variant='text'
                  width='100%'
                  height='40px'
                />

                <div className='flex gap-3 flex-col'>
                  <div className='flex items-center gap-4'>
                    Quantity:{' '}
                    <Skeleton
                      variant='text'
                      width='40px'
                      height='40px'
                    />
                  </div>
                  <QuantityInput value={1} />
                </div>
                <LoadingButton
                  variant='outlined'
                  disabled
                >
                  Add To Cart
                </LoadingButton>
                <div className='border-b pb-10'>
                  <Skeleton
                    variant='text'
                    width='100%'
                    height='100px'
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <div className='flex'>
                    <span className=' w-[150px]'>SKU:</span>
                    <span className=''>
                      <Skeleton
                        variant='text'
                        width={150}
                        height={30}
                      />
                    </span>
                  </div>
                  <div className='flex'>
                    <span className=' w-[150px]'>Category:</span>
                    <Skeleton
                      variant='text'
                      width={150}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : product.status === 'succeeded' ? (
          <>
            <div className='md:w-7/12 lg:w-2/3 flex-col gap-4 md:gap-[32px] md:flex-row'>
              <div className='flex-1'>
                <img
                  src={image}
                  alt='product.data'
                  className='w-full hidden md:block aspect-square object-cover rounded-lg'
                />
              </div>
              <div
                ref={imageRefBody}
                className='flex md:snap-none overflow-hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-[10px] mt-[10px]'
              >
                {images.map((item) => (
                  <img
                    key={uuidv4()}
                    src={item.image}
                    ref={imageRef}
                    onClick={() => setImage(item.image)}
                    alt='product.data'
                    className={`snap-center aspect-square col-span-1 md:h-auto object-cover rounded-sm cursor-pointer ${
                      image === item.image && 'md:border border-[#B88E2F]'
                    }`}
                  />
                ))}
              </div>
              <div className='flex md:hidden items-center p-3 w-[138px] justify-between mx-auto mt-3 mb-10'>
                <IconButton
                  disabled={imagePosition === 1}
                  onClick={() => {
                    if (!imageRefBody.current) return;
                    imageRefBody.current.scrollLeft -= 400;
                    setImagePosition(imagePosition - 1);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.4832 14.3541L13.1903 13.647L9.54385 10.0005L13.1903 6.35408L12.4832 5.64697L8.12964 10.0005L12.4832 14.3541Z'
                      fill='black'
                    />
                  </svg>
                </IconButton>
                <span className='text-[#7D7D7D]'>{`${imagePosition}/${images.length}`}</span>
                <IconButton
                  onClick={() => {
                    if (!imageRefBody.current) return;
                    imageRefBody.current.scrollLeft += 400;
                    setImagePosition(imagePosition + 1);
                  }}
                  disabled={imagePosition === images.length}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.83675 14.3541L8.12964 13.647L11.7761 10.0005L8.12964 6.35408L8.83675 5.64697L13.1903 10.0005L8.83675 14.3541Z'
                      fill='black'
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
            <div className='md:w-5/12 lg:w-1/3'>
              <div className='justify-end md:justify-normal sticky top-[61px] flex flex-col gap-4 md:gap-[18px]'>
                <h2 className='md:text-[30px] capitalize'>
                  {product.data?.name}
                </h2>
                <div className='flex gap-3 items-center'>
                  {productItem?.priceDiscount && (
                    <span className='text-[17px] font-medium'>
                      ${productItem?.priceDiscount}
                    </span>
                  )}

                  <span
                    className={`${
                      productItem?.priceDiscount
                        ? 'line-through'
                        : 'text-[17px]'
                    }`}
                  >
                    ${productItem?.price}
                  </span>

                  <span>Sold: {productItem?.sold ? productItem.sold : 0}</span>
                </div>
                <FormRadius
                  title='Color'
                  alignment={color}
                  onChange={handleChangeColor}
                  list={colors}
                />
                <FormRadius
                  title='Size'
                  alignment={size}
                  onChange={handleChangeSize}
                  list={sizes}
                />
                <div className='flex gap-3 flex-col'>
                  <span>Quantity: {productItem?.quantity}</span>
                  <QuantityInput
                    value={quantity}
                    onChange={(value: number) => setQuantity(value)}
                  />
                </div>
                <LoadingButton
                  onClick={handleAddToCart}
                  variant='outlined'
                  loading={status.add === 'loading'}
                >
                  Add To Cart
                </LoadingButton>

                <div className='border-b pb-10'>{product?.data?.description}</div>

                <div className='flex flex-col gap-3'>
                  <div className='flex'>
                    <span className=' w-[150px]'>SKU:</span>
                    <span className=''>
                      {product.status === 'succeeded' ? (
                        product.data?.productId
                      ) : (
                        <Skeleton
                          variant='text'
                          width={150}
                          height={30}
                        />
                      )}
                    </span>
                  </div>
                  <div className='flex'>
                    <span className=' w-[150px]'>Category:</span>
                    {product.status === 'succeeded' ? (
                      <div>
                        {product.data?.productCategories &&
                          product.data?.productCategories.map((category) => (
                            <span
                              key={uuidv4()}
                              className='mr-[10px] w-5/6 capitalize'
                            >
                              {category.category.name}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <Skeleton
                        variant='text'
                        width={150}
                        height={30}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <img
              src={productNotFound}
              alt='product not found'
            />
          </div>
        )}
      </div>
      <Products
        title='Related Products'
        products={productSuggestion.data}
        status={productSuggestion.status}
        limit={4}
      />
    </div>
  );
}

export default ProductDetail;
