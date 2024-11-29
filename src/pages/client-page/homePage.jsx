


import { Footer } from '../../components/footer/footer';
import Header from './../../components/header/header';
import Gallery from './galleryView';
import Feedback from './view_feedback';
import background from '../../../public/hotel-bg.png';


export default function HomePage() {
  return (
    <>
      <Header />
      {/* <div
        className="w-full h-screen bg-blue-900 flex flex-col items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}

      > */}

<div
  className="w-full h-screen bg-blue-900 flex flex-col items-center justify-center relative bg-cover bg-center"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    imageRendering: 'optimizeQuality',
  }}
>



        {/* Content */}
        <h1 className="text-white text-[50px] w-full text-center hidden lg:block py-10 relative z-10">
          Welcome to the Leonine Villa
        </h1>
        <h1 className="text-white text-[50px] w-full text-center lg:hidden py-10 relative z-10">
          Welcome to Sri Lanka
        </h1>

        {/* Premium Square Button */}
        <button
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-[18px] w-[120px] h-[60px] rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-10 relative z-10"
        >
          Book Now
        </button>
      </div>
      <Feedback />
      <Gallery />
      <Footer />
    </>
  );
}
