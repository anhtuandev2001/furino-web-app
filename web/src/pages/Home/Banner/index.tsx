import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ButtonLink } from '../../../common';
import { data } from './mocksData';
import { settings } from './setting';
import { v4 as uuidv4 } from 'uuid';

function Banner() {
  return (
    <section>
      <Slider {...settings}>
        {data.map((item) => (
          <div
            key={uuidv4()}
            className='h-[450px] sm:h-[720px] relative'
          >
            <img
              src={item.image}
              alt=''
              className='w-full h-full absolute bottom-0 left-0 right-0 top-0 object-cover'
            />
            <div className='flex right-10 left-10 bot flex-col absolute z-10 max-w-[643px] bg-white top-1/2 -translate-y-1/2 sm:translate-x-1/2 p-[20px] sm:right-1/2 sm:pt-[60px] sm:pb-[40px] sm:px-[40px] rounded-sm'>
              <span className='font-semibold text-[#333333] tracking-[3px]'>
                {item.supTitle}
              </span>
              <h2 className='text-primary text-[24px] sm:text-[52px] font-bold mt-[4px]'>
                {item.title}
              </h2>
              <p className='text-[14px] sm:text-[18px] text-[#333333] font-medium pt-[17px]'>
                {item.description}
              </p>
              <div className='flex justify-end'>
                <ButtonLink
                  link={item.link}
                  sx={{
                    marginTop: { sm: '46px', xs: '20px' },
                    padding: '25px 72px',
                  }}
                >
                  BUY NOW
                </ButtonLink>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Banner;
