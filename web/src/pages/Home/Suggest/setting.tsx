import { CustomDot, CustomNextArrow, CustomPrevArrow } from '../../../common';
import { ReactNode } from 'react';

export const settings = (slideShow: number) => ({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: slideShow,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  autoplay: true,
  autoplaySpeed: 3000,
  appendDots: (dots: ReactNode) => (
    <div style={slideShow === 2 ? { bottom: '20px', left: '200px' } : {bottom: 0}}>
      <ul className='pagination-list'>{dots}</ul>
    </div>
  ),
  customPaging: function (i: number | undefined) {
    return <CustomDot index={i} />;
  },
});
