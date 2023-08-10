import { useNavigate } from 'react-router-dom';
import ChangeText from '../../components/change-text';
import Navbar from '../../components/navbar/navbar';
import Desease from './desease';

export default function HomePage() {
  const navigate = useNavigate();

  const onHandleClick = () => navigate('/skin-cancer');
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full min-h-screen center relative overflow-hidden">
        <div className="w-[80%] center ">
          {/* <div className="sm:block hidden absolute w-[200px] left-[18%] bottom-[30%] translate-y-[50%] ">
            <Player autoplay loop src={'/left-2.json'} />
          </div>
          <div className="sm:block hidden absolute w-[300px] right-[18%] bottom-[30%] translate-y-[50%] ">
            <Player autoplay loop src={'/find.json'} />
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
            <p className="text-sm text-gray-500 mt-4">
              Test is conducted free of charge,
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-t-[5%] w-full min-h-screen h-full  center">
        <div className="grid grid-cols-2 max-w-[800px] w-full h-[450px] gap-x-10 gap-y-20 m-5">
          <Desease name="Diabetes" />
          <Desease name="Coronary Heart" />
          <Desease name="Cancer" />
          <Desease name="Stroke" />
        </div>
      </div>
    </>
  );
}
