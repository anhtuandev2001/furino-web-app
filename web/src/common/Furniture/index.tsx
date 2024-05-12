import { furniture } from "../../assets/images";

function Furniture() {
  return (
    <section className='mt-[67px] flex flex-col items-center mb-[50px]'>
      <span className="text-[#616161] text-[20px] font-semibold">Share your setup with</span>
      <h2 className="text-[#3A3A3A] text-[40px] font-bold mt-2">#FuniroFurniture</h2>
      <img src={furniture} alt="furniture" />
    </section>
  );
}

export default Furniture;
