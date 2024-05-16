import {
    CustomPrevArrow,
    CustomNextArrow,
    CustomDot,
  } from '..';
import { ReactNode } from 'react';


export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: ReactNode) => (
      <div
        className='bottom-10'
        style={{ bottom: '20px' }}
        color='white'
      >
        <ul className='pagination-list'>{dots}</ul>
      </div>
    ),
    customPaging: function (i: number | undefined) {
      return <CustomDot index={i} />;
    },
  };