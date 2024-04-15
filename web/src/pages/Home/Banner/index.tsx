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
            className='h-[720px] relative'
          >
            <img
              src={item.image}
              alt=''
              className='w-full h-full absolute bottom-0 left-0 right-0 top-0 object-cover'
            />
            <div className='flex flex-col absolute z-10 max-w-[643px] bg-[#FFF3E3] top-1/2 -translate-y-1/2 right-20 pt-[60px] pb-[40px] px-[40px] rounded'>
              <span className='font-semibold text-[#333333] tracking-[3px]'>
                {item.supTitle}
              </span>
              <h2 className='text-primary text-[52px] font-bold mt-[4px]'>
                {item.title}
              </h2>
              <p className='text-[18px] text-[#333333] font-medium pt-[17px]'>
                {item.description}
              </p>
              <ButtonLink
                link={item.link}
                sx={{ marginTop: '46px', padding: '25px 72px' }}
              >
                BUY NOW
              </ButtonLink>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Banner;
