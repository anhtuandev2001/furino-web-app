import { commits } from '../../utils/constants/commit';
import { v4 as uuidv4 } from 'uuid';

function Commit() {
  return (
    <div className='bg-[#FAF3EA] mt-[85px]'>
      <div className='container mx-auto'>
        <div className='flex py-[50px] sm:py-[100px] -mx-[25px] flex-col sm:flex-row gap-4 sm:gap-0 px-4'>
          {commits.map((item) => (
            <div
              className='flex gap-[10px] sm:w-1/4 px-[25px]'
              key={uuidv4()}
            >
              <img
                src={item.image}
                alt='cup'
              />
              <div className='flex flex-col'>
                <span className='text-[25px] font-semibold text-[#242424]'>
                  {item.title}
                </span>
                <span className='text-[20px] text-[#898989] font-medium'>
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Commit;
