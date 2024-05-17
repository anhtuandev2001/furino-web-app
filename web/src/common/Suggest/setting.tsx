import { CustomDot, CustomNextArrow, CustomPrevArrow } from '..';
import { ReactNode } from 'react';

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: window.innerWidth < 1024 ? 1 : 2,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  // autoplay: true,
  autoplaySpeed: 3000,
  appendDots: (dots: ReactNode) => (
    <div
      style={
        window.innerWidth < 768
          ? { bottom: 0 }
          : { bottom: '0px', left: '0' }
      }
    >
      <ul className='pagination-list'>{dots}</ul>
    </div>
  ),
  customPaging: function (i: number | undefined) {
    return <CustomDot index={i} />;
  },
};
