import about1 from '../../assets/images/about-1.png';
import about2 from '../../assets/images/about-2.png';
import about3 from '../../assets/images/about-3.png';

function About() {
  return (
    <div className='container flex flex-col gap-10 md:items-center'>
      <div className='pt-10 flex flex-col gap-[10px] px-4 md:grid grid-cols-3'>
        <img
          src={about1}
          alt='about-1'
          className='md:col-span-1 w-full aspect-square object-cover'
        />
        <img
          src={about2}
          alt='about-2'
          className='md:col-span-1  w-full aspect-square object-cover'
        />
        <img
          src={about3}
          alt='about-3'
          className='md:col-span-1  w-full aspect-square object-cover'
        />
      </div>
      <div className='flex flex-col gap-8 px-4 max-w-[495px]'>
        <h2 className='text-[30px] md:text-[40px]'>About</h2>
        <p>
          Mlouye’s founder and creative director Meb Rure hails from an
          industrial design background. In 2015, Meb decided to change gears and
          turn her energy towards Mlouye, a collection of exceptional handbags.
          Focusing on quality material, good design, craftsmanship and
          sustainability, Mlouye reflects the epitome of quality over quantity.
        </p>
        <p>
          Meb was highly inspired by the Bauhaus Movement's artists and
          architects. From Mies van der Rohe's works to Kandinsky's paintings,
          to Aalto's furniture, she acquired a rationalist vision of design by
          gleaning how they served a utilitarian purpose in a cleverly simple
          way. Mlouye merges industrial design and fashion, creating functional
          handbags made of luxurious and honest materials to improve people's
          lives in small but important ways.
        </p>
        <p>
          Innovation being the key factor alongside aesthetic, Mlouye has
          brought unexpected shapes with smart details, functionality and a new
          luxury feel with a contemporary price point.
        </p>
        <p>
          Istanbul is where Mlouye was born, the company's headquarters is now
          split between the US, and Turkey.
        </p>
      </div>
      <div className='flex flex-col gap-8 p-10 items-center bg-[#F0F0F0] mb-10 max-w-[495px]'>
        <h3 className='text-[20px] md:text-[24px]'>Our quality promise</h3>
        <p className='text-center'>
          Quality is never an accident. It is always the result of intelligent
          effort. We spend most of our time and energy for good design and to
          achieve high quality. Every single detail from material to technique
          is thought through with obsessive attention. If our product doesn't
          satisfy you, we'll take it back.
        </p>
      </div>
    </div>
  );
}

export default About;
