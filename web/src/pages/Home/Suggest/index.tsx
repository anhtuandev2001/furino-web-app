import { SetStateAction, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { v4 as uuidv4 } from 'uuid';
import { ButtonLink } from '../../../common';
import { data } from './mockData';
import { settings } from './setting';

function Suggest() {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const handleBeforeChange = (_: any, next: SetStateAction<number>) => {
    setSelectedSlideIndex(next);
  };

  return (
    <section className='flex bg-[#FCF8F3] mt-[70px]'>
      <div className='container mx-auto flex flex-col px-4 sm:px-0 sm:flex-row py-[44px] items-center gap-4'>
        <div className='flex flex-col sm:w-1/3'>
          <h2 className='text-[#3A3A3A] text-[40px] font-bold'>
            50+ Beautiful rooms inspiration
          </h2>
          <span className='#616161 font-medium mt-[7px]'>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </span>
          <div className='flex justify-end sm:justify-normal'>
            <ButtonLink
              link='/'
              sx={{ marginTop: '25px', padding: '12px 36px' }}
            >
              Explore More
            </ButtonLink>
          </div>
        </div>
        <div className='w-full sm:w-2/3 overflow-hidden'>
          <Slider
            {...settings}
            beforeChange={handleBeforeChange}
            className='h-[400px] sm:h-[600px]'
          >
            {data.map((item, index) => (
              <div
                className='sm:px-[12px] relative'
                key={uuidv4()}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`${
                    index === selectedSlideIndex
                      ? 'h-[350px] sm:h-[582px]'
                      : 'h-[250px] sm:h-[486px]'
                  } w-full sm:w-[404px] object-cover transition-all duration-300 ease-out`}
                />
                {index === selectedSlideIndex && (
                  <div className='absolute bottom-0 sm:bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-10 flex'>
                    <div className='pt-[32px] pl-[15px] pr-[15px] sm:pl-[32px] pb-[45px] sm:pb-[32px] sm:pr-[17px] bg-white opacity-[90%] flex flex-col gap-[8px]'>
                      <div className='flex gap-2 text-[#616161] font-medium'>
                        <span>{selectedSlideIndex + 1}</span>
                        <GoDash size={24} />
                        <span>{item.category}</span>
                      </div>
                      <span className='text-[#3A3A3A] text-[24px] sm:text-[28px] font-semibold'>
                        {item.title}
                      </span>
                    </div>
                    <div className='flex items-end absolute sm:static bottom-0 right-0'>
                      <ButtonLink
                        link={item.link}
                        sx={{ padding: '12px' }}
                      >
                        <FaArrowRightLong size={22} />
                      </ButtonLink>
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
