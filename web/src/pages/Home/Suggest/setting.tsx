import {
  CustomDot,
  CustomNextArrow,
  CustomPrevArrow,
} from '../../../common';
import { ReactNode } from 'react';

export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: ReactNode) => (
      <div
        style={{ bottom: '20px', left:'200px' }}
      >
        <ul className='pagination-list'>{dots}</ul>
      </div>
    ),
    customPaging: function (i: number | undefined) {
      return <CustomDot index={i} />;
    },
  };
