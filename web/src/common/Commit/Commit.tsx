import { commits } from '../../utils/constants/commit';
import { v4 as uuidv4 } from 'uuid';

function Commit() {
  return (
    <div className='bg-[#FAF3EA] mt-[85px] hidden md:block'>
      <div className='md:container md:mx-auto'>
        <div className='py-[50px] grid grid-flow-col-1 md:grid-cols-4 md:py-[100px] gap-4 md:gap-0 px-4'>
          {commits.map((item) => (
            <div
              className='flex gap-[10px] md:px-[25px]'
              key={uuidv4()}
            >
              <img
                src={item.image}
                alt='cup'
              />
              <div className='flex flex-col'>
                <span className='md:text-[25px] font-semibold text-[#242424]'>
                  {item.title}
                </span>
                <span className='text-[16px] md:text-[20px] text-[#898989] font-medium'>
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
