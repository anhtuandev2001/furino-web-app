import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 as uuidv4 } from 'uuid';
import { data } from './mocksData';
import { settings } from './setting';

function Banner() {
  return (
    <section>
      <Slider {...settings}>
        {data.map((item) => (
          <div
            key={uuidv4()}
            className='h-[450px] md:h-[720px] relative'
          >
            <img
              src={item.image}
              alt=''
              className='w-full h-full absolute bottom-0 left-0 right-0 top-0 object-cover'
            />
            <div className='flex right-10 bot flex-col absolute z-10 w-[300px] md:w-auto md:max-w-[643px] bg-white top-1/2 -translate-y-1/2 -translate-x-1/2 p-[20px] left-1/2 md:pt-[60px] md:pb-[40px] md:px-[40px] rounded-sm'>
              <span className='font-semibold text-[#333333] tracking-[3px]'>
                {item.supTitle}
              </span>
              <h2 className='text-[24px] md:text-[52px] font-bold mt-[4px]'>
                {item.title}
              </h2>
              <p className='text-[14px] md:text-[18px] text-[#333333] font-medium pt-[17px]'>
                {item.description}
              </p>
              <div className='flex justify-end'>
                <Button
                  component={Link}
                  to='/shop'
                  sx={{ marginTop: '20px' }}
                  variant='contained'
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Banner;
