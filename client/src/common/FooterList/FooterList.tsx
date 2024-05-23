import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { info, quickLinks, social } from '../../utils/constants/footer';
import { TextField } from '@mui/material';

function FooterList() {
  return (
    <section className='container px-4'>
      <div className='py-10 flex gap-[30px] flex-col md:grid grid-cols-3'>
        <div className=''>
          <h2 className='text-[18px] mb-[30px]'>Quick links</h2>
          <div className='flex flex-col gap-4'>
            {quickLinks.map((link) => (
              <Link
                key={uuid()}
                to={link.path}
                className='text-[14px]'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className=''>
          <h2 className='text-[18px] mb-[30px]'>Info</h2>
          <div className='flex flex-col gap-4'>
            {info.map((link) => (
              <Link
                key={uuid()}
                to={link.path}
                className='text-[14px]'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className='md:hidden'>
          <h2 className='text-[18px] mb-[22px]'>Our mission</h2>
          <span className='text-sm'>
            Quality materials, good designs, craftsmanship and sustainability.
          </span>
        </div>
        <Link
          to='/'
          className='text-[30px] font-bold hidden md:block'
        >
          FURINO
        </Link>
      </div>
      <div className='flex gap-6 flex-col items-center md:grid md:grid-cols-3 md:justify-between'>
        <div className='flex flex-col gap-6 md:col-span-2 w-full'>
          <h2 className='text-[18px]'>Subscribe to our emails</h2>
          <TextField
            placeholder='Email'
            sx={{ width: { xs: '100%', md: '331px' } }}
          />
        </div>
        <div className='flex gap-6 col-span-1'>
          {social.map((link) => (
            <Link
              key={uuid()}
              to={link.path}
              className='text-[14px]'
            >
              {link.icon()}
            </Link>
          ))}
        </div>
      </div>
      <div className='pt-4 mt-10 border-t'>
        <span className='text-sm text-center'>
          © 2021 Furino. All rights reserved.
        </span>
      </div>
    </section>
  );
}

export default FooterList;
