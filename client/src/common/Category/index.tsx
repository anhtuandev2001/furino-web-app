import { data } from './mocksData';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Category() {
  return (
    <section className='mt-[56px] container px-4'>
      <h2 className='font-bold text-[32px] text-[#333333] text-center'>
        Browse The Range
      </h2>
      <p className='text-[20px] text-[#666666] text-center'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className='flex-col md:p-0 md:flex-row flex gap-[20px] mt-[62px]'>
        {data.map((item) => (
          <Link
            to={item.link}
            key={uuidv4()}
            className='flex flex-col items-center gap-[30px]'
          >
            <img
              src={item.image}
              alt={item.title}
            />
            <span className='text-[24px] text-[#333333] font-semibold'>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Category;
