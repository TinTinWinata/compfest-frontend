import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import ChangeText from '../components/change-text';
import Navbar from '../components/navbar/navbar';

export default function Home() {
  const navigate = useNavigate();

  const onHandleClick = () => navigate('/skin-cancer');
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full min-h-screen center relative overflow-hidden">
        <div className="w-[80%] center ">
          {/* <div className="absolute w-[250px] left-[0px] bottom-[5%] translate-y-[50%] ">
            <Player autoplay loop src={'/left.json'} />
          </div> */}
          <div className="absolute w-[300px] right-[0%] bottom-[40%] translate-y-[50%] ">
            <Player autoplay loop src={'/find.json'} />
          </div>
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
            <p className="text-sm text-gray-500 mt-4">
              Test is conducted free of charge,
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen h-full "></div>
    </>
  );
}
