import { IoIosArrowForward } from 'react-icons/io';
import { navigation } from '../../assets/images';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  part: string;
  title: string;
}

function Breadcrumb({ part, title }: BreadcrumbProps) {
  return (
    <section
      className='h-[250px] sm:h-[316px] flex justify-center items-center flex-col gap-1 object-cover'
      style={{
        backgroundImage: `url(${navigation})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 className='text-[30px] sm:text-[48px] font-medium text-black'>{title}</h1>
      <div className='flex items-center gap-2'>
        <Link to={'/'}>Home</Link>
        <span>
          <IoIosArrowForward size={24} />
        </span>
        <Link to={`/${part}`}>
          <span>{title}</span>
        </Link>
      </div>
    </section>
  );
}

export default Breadcrumb;
