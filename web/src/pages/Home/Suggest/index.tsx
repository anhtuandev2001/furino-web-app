import { SetStateAction, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { GoDash } from 'react-icons/go';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ButtonLink } from '../../../common';
import { data } from './mockData';
import { settings } from './setting';
import { v4 as uuidv4 } from 'uuid';

function Suggest() {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const handleBeforeChange = (_: any, next: SetStateAction<number>) => {
    setSelectedSlideIndex(next);
  };

  return (
    <section className='flex bg-[#FCF8F3] mt-[70px]'>
      <div className='container mx-auto flex py-[44px] items-center gap-4'>
        <div className='flex flex-col w-1/3'>
          <h2 className='text-[#3A3A3A] text-[40px] font-bold'>
            50+ Beautiful rooms inspiration
          </h2>
          <span className='#616161 font-medium mt-[7px]'>
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </span>
          <ButtonLink
            link='/'
            sx={{ marginTop: '25px', padding: '12px 36px' }}
          >
            Explore More
          </ButtonLink>
        </div>
        <div className='w-2/3 overflow-hidden'>
          <Slider
            {...settings}
            beforeChange={handleBeforeChange}
            className='h-[600px]'
          >
            {data.map((item, index) => (
              <div
                className='px-[12px] relative'
                key={uuidv4()}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className='h-[486px] w-[404px] object-cover transition-all duration-300 ease-out'
                  style={{
                    height: index === selectedSlideIndex ? '582px' : '',
                  }}
                />
                {index === selectedSlideIndex && (
                  <div className='absolute bottom-6 left-10 flex'>
                    <div className='pt-[32px] pl-[32px] pb-[32px] pr-[17px] bg-white opacity-[90%] flex flex-col gap-[8px]'>
                      <div className='flex gap-2 text-[#616161] font-medium'>
                        <span>{selectedSlideIndex + 1}</span>
                        <GoDash size={24} />
                        <span>{item.category}</span>
                      </div>
                      <span className='text-[#3A3A3A] text-[28px] font-semibold'>
                        {item.title}
                      </span>
                    </div>
                    <div className='flex items-end'>
                      <ButtonLink link={item.link} sx={{padding: '12px'}}>
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
