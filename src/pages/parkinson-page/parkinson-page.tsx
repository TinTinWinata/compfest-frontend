import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { HiMiniMicrophone } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { HEALTH_TEXT } from '../../settings/text-setting';

export default function ParkinsonPage() {
  const getRandomText = () => {
    const max = HEALTH_TEXT.length - 1;
    const min = 0;
    const idx = Math.floor(Math.random() * (max - min) + min);
    const text = HEALTH_TEXT[idx];
    return text;
  };
  const [text, setText] = useState<string>(getRandomText());
  const handleChangeText = () => {
    setText(getRandomText());
  };
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div
        data-aos="fade-up"
        className="items-center w-full  flex flex-col  text-gray-500 tracking-wider text-center h-[65%]"
      >
        <div className="w-3/4 mt-32  flex justify-between">
          <Link
            to="/home"
            className="w-20 text-primary center gap-1 hover:underline cursor-pointer"
          >
            <div className="center">
              <BiArrowBack className="w-3 h-3" />
            </div>
            <div className="">Back</div>
          </Link>
          <button
            onClick={handleChangeText}
            className="py-3 px-8 transition-all hover:text-white hover:bg-primary text-xl rounded-full border-2 font-semibold border-primary text-primary"
          >
            Change Paragraph
          </button>
          <div className="w-20"></div>
        </div>
        <div className="w-3/4 text-3xl mt-16 ">{text}</div>
      </div>
      <div className="absolute bg-primary w-full h-[30%] bottom-0 left-0 rounded-t-3xl">
        <div className="cursor-pointer absolute top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full  w-[300px] h-[300px] bg-white border-4 border-primary center">
          <div className="">
            <HiMiniMicrophone className="text-primary w-[100px] h-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
