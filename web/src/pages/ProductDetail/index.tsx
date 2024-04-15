import { Button, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FormRadius from '../../common/FormRadius/FormRadius';
import ProductTitle from '../../common/ProductTitle/ProductTitle';
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

  const imageRefBody = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const productId = useParams().id;

  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    if (productItem?.quantity && quantity >= productItem?.quantity) return;
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
      const newColors = product?.productInventories
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
        product?.productInventories.reduce((unique: ProductColor[], item) => {
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
        product?.productImages.find(
          (item) => item.productColorId === Number(newAlignment)
        )?.image || ''
      );

      const newSizes = product?.productInventories
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
        product?.productInventories.reduce((unique: ProductSize[], item) => {
          if (
            !unique.some(
              (size) => size?.productSizeId === item.productSize.productSizeId
            )
          ) {
            unique.push(item?.productSize);
          }
          return unique;
        }, []) || []
      );
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    if(!size || !color) return;
    checkTokenExistence();
    const data = {
      productId: product.productId,
      productSizeId: Number(size),
      productColorId: Number(color),
      quantity,
    };
    dispatch(productDetailActions.onHandleAddToCart(data));
  };

  useEffect(() => {
    dispatch(productDetailActions.getProduct(Number(productId)));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setProductItem(product.productInventories[0]);
      setSizes(
        product.productInventories.reduce((unique: ProductSize[], item) => {
          if (
            !unique.some(
              (size) => size?.productSizeId === item.productSize.productSizeId
            )
          ) {
            unique.push(item?.productSize);
          }
          return unique;
        }, [])
      );
      setColors(
        product.productInventories.reduce((unique: ProductColor[], item) => {
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
      );
      setImages([...product.productGeneralImages, ...product.productImages]);
      setImage(product.productGeneralImages[0]?.image);
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (size && color && product) {
      const productItemSelect = product.productInventories.find(
        (item) =>
          item?.productSize?.productSizeId === Number(size) &&
          item?.productColor?.productColorId === Number(color)
      );
      if (productItemSelect) {
        setProductItem(productItemSelect);
      }
    }
  }, [color, product, size]);

  return (
    <div className='mb-6'>
      <div className='py-[40px] bg-[#F9F1E7]'>
        <div className='flex items-center gap-2 container mx-auto'>
          <Link to={'/'}>Home</Link>
          <span>
            <IoIosArrowForward size={24} />
          </span>
          <Link to={`/shop`}>
            <span>Shop</span>
          </Link>
          <span className='text-xl'>|</span>
          {product ? (
            <span className='capitalize'>{product?.name}</span>
          ) : (
            <Skeleton
              variant='text'
              width={150}
              height={30}
            />
          )}
        </div>
      </div>
      <div className='container mx-auto flex mt-[32px]'>
        <div className='w-2/3 flex gap-[32px] pr-[50px]'>
          <div
            ref={imageRefBody}
            className='flex flex-col gap-[32px] overflow-auto h-[500px]'
          >
            {product ? (
              images.map((item) => (
                <img
                  key={uuidv4()}
                  src={item.image}
                  ref={imageRef}
                  onClick={() => setImage(item.image)}
                  alt='product'
                  className={`w-[150px] object-cover rounded-md cursor-pointer ${
                    image === item.image && 'border-4 border-[#B88E2F]'
                  }`}
                />
              ))
            ) : (
              <>
                <Skeleton
                  variant='rectangular'
                  width={150}
                  height={100}
                />
                <Skeleton
                  variant='rectangular'
                  width={150}
                  height={100}
                />
                <Skeleton
                  variant='rectangular'
                  width={150}
                  height={100}
                />
                <Skeleton
                  variant='rectangular'
                  width={150}
                  height={100}
                />
              </>
            )}
          </div>
          <div className='flex-1'>
            {product ? (
              <img
                src={image}
                alt='product'
                className='h-[500px] object-cover rounded-lg'
              />
            ) : (
              <Skeleton
                variant='rectangular'
                height={500}
              />
            )}
          </div>
        </div>
        <div className='w-1/3 flex flex-col gap-[18px]'>
          <h2 className='text-[42px] capitalize'>
            {product ? (
              product?.name
            ) : (
              <Skeleton
                variant='text'
                width={150}
                height={40}
              />
            )}
          </h2>
          <div className='flex gap-3 items-center'>
            {product ? (
              <>
                {productItem?.priceDiscount && (
                  <span className='text-[24px] text-[#9F9F9F] font-medium'>
                    ${productItem?.priceDiscount}
                  </span>
                )}

                <span
                  className={`text-[#9F9F9F] ${
                    productItem?.priceDiscount
                      ? 'line-through'
                      : 'text-[24px] text-[#9F9F9F] font-medium'
                  }`}
                >
                  ${productItem?.price}
                </span>

                <span>Sold: {productItem?.sold ? productItem.sold : 0}</span>
              </>
            ) : (
              <Skeleton
                variant='text'
                width={150}
                height={30}
              />
            )}
          </div>
          <p className='text-[13px] max-w-[424px] capitalize'>
            {product ? (
              product?.description
            ) : (
              <Skeleton
                variant='text'
                width={424}
                height={100}
              />
            )}
          </p>
          <FormRadius
            title='Size'
            alignment={size}
            onChange={handleChangeSize}
            list={sizes}
            sx={{
              color: 'black',
              fontSize: '13px',
              backgroundColor: '#F9F1E7',
              '&.Mui-selected': {
                backgroundColor: '#B88E2F',
                color: 'white',
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#B88E2F',
                color: 'white',
              },
            }}
            style={{
              borderRadius: '5px',
            }}
          />

          <FormRadius
            title='Color'
            alignment={color}
            onChange={handleChangeColor}
            list={colors}
            style={{
              borderRadius: '100%',
            }}
          />

          <span className='text-[#9F9F9F] w-[150px] flex items-center gap-2'>
            Quantity:{' '}
            {product ? (
              productItem?.quantity
            ) : (
              <Skeleton
                variant='text'
                width={150}
                height={30}
              />
            )}
          </span>

          <div className='flex pb-[60px] border-b-2'>
            <div className='flex items-center border w-[fit-content] rounded-md h-[50px]'>
              <Button
                onClick={handleDecrease}
                sx={{
                  padding: 0,
                  minWidth: '35px',
                  color: 'black',
                  fontSize: '20px',
                  height: '100%',
                }}
              >
                -
              </Button>
              <input
                type='text'
                value={quantity}
                onChange={(e) => {
                  if (
                    productItem?.quantity &&
                    Number(e.target.value) > productItem?.quantity
                  )
                    return;
                  setQuantity(Number(e.target.value));
                }}
                className='outline-none w-[50px] text-center pt-1'
                max={productItem?.quantity}
              />
              <Button
                onClick={handleIncrease}
                sx={{
                  padding: 0,
                  minWidth: '35px',
                  color: 'black',
                  fontSize: '20px',
                  height: '100%',
                }}
              >
                +
              </Button>
            </div>
            <Button
              variant='contained'
              onClick={handleAddToCart}
              sx={{
                fontSize: '20px',
                color: 'white',
                marginLeft: '20px',
                textTransform: 'capitalize',
                outline: 'black',
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              <span> Add To Cart</span>
            </Button>
          </div>
          <div className='pt-[41px] flex flex-col gap-3 pb-[67px]'>
            <div className='flex'>
              <span className='text-[#9F9F9F] w-[150px]'>SKU:</span>
              <span className='text-[#9F9F9F]'>
                {product ? (
                  product?.productId
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
              <span className='text-[#9F9F9F] w-[150px]'>Category:</span>
              {product ? (
                <div>
                  {product?.productCategories &&
                    product?.productCategories.map((category) => (
                      <span
                        key={uuidv4()}
                        className='text-[#9F9F9F] mr-[10px] w-5/6 capitalize'
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
      <ProductTitle
        title='Related Products'
        products={productSuggestion}
        limit={4}
      />
    </div>
  );
}

export default ProductDetail;