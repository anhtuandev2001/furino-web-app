import { Button } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 as uuidv4 } from 'uuid';
import { data } from './mockData';
import { settings } from './setting';
import './style.scss';

function Suggest() {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const handleBeforeChange = (_: any, next: SetStateAction<number>) => {
    setSelectedSlideIndex(next);
  };

  return (
    <section className='flex bg-[#FCF8F3] mt-[70px] w-full container px-4'>
      <div className='flex flex-col px-4 md:px-0 md:flex-row py-[44px] items-center gap-4 w-full'>
        <div className='flex px-[20px] flex-col md:w-1/3'>
          <h2 className='text-[#3A3A3A] text-[40px] font-bold'>
            50+ Beautiful rooms inspiration
          </h2>
          <span className='#616161 font-medium mt-[7px]'>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </span>
          <div className='flex justify-end md:justify-normal'>
            <Button
              to='/shop'
              variant='contained'
              sx={{ marginTop: '32px' }}
              component={Link}
            >
              Explore More
            </Button>
          </div>
        </div>
        <div className='w-full md:w-2/3 overflow-hidden'>
          <Slider
            {...settings}
            beforeChange={handleBeforeChange}
            className='h-[400px] md:h-[500px]'
          >
            {data.map((item, index) => (
              <div
                className='md:px-[12px] relative'
                key={uuidv4()}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`${
                    index === selectedSlideIndex
                      ? 'h-[350px] md:h-[450px]'
                      : 'h-[250px] md:h-[350px]'
                  } w-full lg:w-[404px] object-cover transition-all duration-300 ease-out`}
                />
                {index === selectedSlideIndex && (
                  <div className='absolute bottom-0 md:bottom-6 left-1/2 -translate-x-1/2 flex'>
                    <div className='pt-[32px] pl-[15px] pr-[15px] min-w-[200px] md:pl-[32px] pb-[45px] md:pb-[32px] md:pr-[17px] bg-white opacity-[90%] flex flex-col gap-[8px]'>
                      <div className='flex gap-2 text-[#616161] font-medium'>
                        <span>{selectedSlideIndex + 1}</span>
                        <GoDash size={24} />
                        <span>{item.category}</span>
                      </div>
                      <span className='text-[#3A3A3A] text-[24px] md:text-[28px] font-semibold'>
                        {item.title}
                      </span>
                    </div>
                    <div className='flex items-end absolute md:static bottom-0 right-0'>
                      <Button
                        component={Link}
                        to='/shop'
                        sx={{
                          padding: '12px',
                          backgroundColor: 'black',
                          color: 'white',
                        }}
                      >
                        <FaArrowRightLong size={22} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Suggest;
