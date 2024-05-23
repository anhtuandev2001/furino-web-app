import { Link } from 'react-router-dom';

function HeadingPage({
  title,
  continueShopping,
}: {
  title: string;
  continueShopping?: boolean;
}) {
  return (
    <div className='text-[30px] py-10 md:text-[40px] md:mt-16 md:mb-8 flex justify-between items-start'>
      <h2 className='text-[30px] md:text-[40px]'>{title}</h2>
      {continueShopping && (
        <Link
          to='/'
          className='text-[14px] underline'
        >
          Continue shopping
        </Link>
      )}
    </div>
  );
}

export default HeadingPage;
