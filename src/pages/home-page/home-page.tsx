import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeText from '../../components/change-text';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar/navbar';
import HomeDeseaseWrapper from './home-disease-wrapper';
import HomeHowTo from './home-how-to';
import HomeJoin from './home-join';
import HomeParallax from './home-parallax';

export default function HomePage() {
  const navigate = useNavigate();
  const onHandleClick = () => navigate('/skin-cancer');
  const firstRef = createRef<HTMLDivElement>();
  return (
    <div>
      <Navbar></Navbar>
      <div
        ref={firstRef}
        className="w-full min-h-screen center relative overflow-hidden"
      >
        <div data-aos="fade-up" className="w-[80%] center ">
          {/* <div className="sm:block hidden absolute w-[200px] left-[18%] bottom-[30%] translate-y-[50%] ">
            <Player autoplay loop src={'/assets/left-2.json'} />
          </div>
          <div className="sm:block hidden absolute w-[300px] right-[18%] bottom-[30%] translate-y-[50%] ">
            <Player autoplay loop src={'/assets/find.json'} />
          </div> */}
          <div className="flex flex-col items-center text-center">
            <div className="text-primary font-bold text-[60px]">
              Best AI for Diagnostics
            </div>
            <ChangeText texts={['Diabetes.', 'Cancer.', 'Stroke.']} />
            <p className="text-gray-400  text-md font-semibold my-8">
              A Safer Tomorrow Starts Today! <br />
              Utilize AI to Detect Desease and Embracing a Healthier Lifestyle
            </p>
            <button
              onClick={onHandleClick}
              className="focus:outline-none px-16 py-4 font-semibold text-xl rounded-full bg-primary text-white"
            >
              Skin Cancer
            </button>
            <p className="tracking-wide text-sm text-gray-500 mt-2 ">
              Test is conducted free of charge,
            </p>
          </div>
        </div>
      </div>
      {/* <div className="my-20">
        <HomeMarquee />
      </div> */}
      <HomeHowTo />
      <HomeParallax firstRef={firstRef} />
      <HomeDeseaseWrapper />
      <HomeJoin />
      <Footer />
    </div>
  );
}
