import { Input } from '@mui/material';
import { helps, links } from '../../utils/constants/link';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function FooterList() {
  return (
    <section className='container mx-auto'>
      <div className='flex gap-5 flex-nowrap py-[20px] md:py-[48px] border-b flex-col-reverse md:flex-row px-4'>
        <div className='md:w-4/12'>
          <h3 className='text-[#000000] text-[24px] font-bold'>Funiro.</h3>
          <p className='block text-[#9F9F9F] mt-4 md:mt-[50px]'>
            400 University Drive Suite 200 Coral Gables,{' '}
          </p>
          <p className='text-[#9F9F9F]'>FL 33134 USA</p>
        </div>
        <div className='md:w-2/12 flex flex-col'>
          <h4 className='text-[#9F9F9F]'>Links</h4>
          <ul className='flex mt-6 md:mt-[55px] flex-col gap-4 md:gap-[46px]'>
            {links.map((item: any) => (
              <li key={uuidv4()}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='md:w-2/12 flex flex-col'>
          <h4 className='te'>Help</h4>
          <ul className='flex mt-6 md:mt-[55px] flex-col gap-4 md:gap-[46px]'>
            {helps.map((item: any) => (
              <li key={uuidv4()}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='md:w-4/12'>
          <h4 className='text-[#9F9F9F]'>Newsletter</h4>
          <div className='mt-[15px] md:mt-[56px] flex gap-5 justify-between md:justify-auto'>
            <Input
              placeholder='Enter Your Email Address'
              sx={{
                '--Input-radius': '0px',
                borderBottom: '2px solid',
                width: '200px',
                borderColor: 'neutral.outlinedBorder',
                '&:hover': {
                  borderColor: 'black',
                },
                '&::before': {
                  border: '1px solid var(--Input-focusedHighlight)',
                  transform: 'scaleX(0)',
                  left: 0,
                  right: 0,
                  bottom: '-2px',
                  top: 'unset',
                  transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                  borderRadius: 0,
                },
                '&:focus-within::before': {
                  transform: 'scaleX(1)',
                },
              }}
            />
            <Button
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                borderBottom: '1px solid black',
                paddingBottom: '2px',
                borderRadius: '0',
              }}
            >
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
      <h5 className='text-[16px] text-black py-[35px] pb-[80px] px-4'>
        2023 furino. All rights reverved
      </h5>
    </section>
  );
}

export default FooterList;
