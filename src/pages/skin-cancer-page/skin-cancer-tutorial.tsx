import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PiCrownDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import SkinCancerTutorialCard from './skin-cancer-tutorial-card';

interface ISkinCancerTutorialProps {
  first: boolean;
  handleClick: () => void;
}

export default function SkinCancerTutorial({
  first,
  handleClick,
}: ISkinCancerTutorialProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const getClass = () =>
    first
      ? ' absolute right-0 top-0 w-[100%]  '
      : ` absolute ${
          open ? 'right-0' : 'right-[-320px]'
        }  rounded-l-3xl top-0 w-[20%]  `;

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleBack = () => navigate('/home');
  return (
    <div
      className={
        'h-full transition-all duration-500  px-20  bg-primary shadow-md  center ' +
        getClass()
      }
    >
      {!first && (
        <div
          onClick={toggleOpen}
          className="cursor-pointer absolute top-[50%] min-translate z-20 left-0 w-24 h-24 center rounded-full bg-primary "
        >
          <PiCrownDuotone className="text-white text-3xl mr-10" />
        </div>
      )}
      <div className="flex flex-col gap-16">
        {first && (
          <div className="">
            <div
              onClick={handleBack}
              className="flex text-white gap-2 cursor-pointer hover:underline"
            >
              <div className="center">
                <BiArrowBack className="" />
              </div>
              <p>Back</p>
            </div>
            <h1 className=" text-white w-full text-center text-[60px] font-bold">
              Skin Disease Classification
            </h1>
            <p className="text-center text-gray-200 text-lg">
              You can click "understand" if you already know how to use it!
            </p>
          </div>
        )}
        <div
          className={
            'flex   justify-center text-white font-bold text-2xl ' +
            (first ? ' flex-row gap-32 ' : ' flex-col ')
          }
        >
          <SkinCancerTutorialCard
            first={first}
            extraClass="top-[30%]"
            animName="mobile"
            title="01. Open Website in Mobile"
          />
          <SkinCancerTutorialCard
            first={first}
            extraClass="top-[35%]"
            animName="photo"
            title="02. Take a Photo"
          />
          <SkinCancerTutorialCard
            first={first}
            extraClass="top-[40%]"
            animName="health-2"
            title="03. Get Result"
          />
        </div>
        {first && (
          <div className="center">
            <button
              onClick={handleClick}
              className="w-full py-5 rounded-xl font-semibold text-xl  hover:bg-orange-500 transition-all text-white bg-orange-400"
            >
              I'm Understand
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
