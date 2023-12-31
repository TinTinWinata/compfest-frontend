import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useParkinsonDemo from '../../hooks/useParkinsonDemo';
import { HEALTH_TEXT } from '../../settings/text-setting';
import ParkinsonMic from '../parkinson-page/parkinson-mic';
import ParkinsonResult from '../parkinson-page/parkinson-result';

export default function ParkinsonDemoPage() {
  const { data, isLoading, checkResult, reset } = useParkinsonDemo();
  const getRandomText = () => {
    const max = HEALTH_TEXT.length - 1;
    const min = 0;
    const idx = Math.floor(Math.random() * (max - min) + min);
    const text = HEALTH_TEXT[idx];
    return text;
  };
  const [open, setOpen] = useState<boolean>(false);
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
            className="py-2 sm:py-3 px-2 sm:px-8 transition-all hover:text-white hover:bg-primary text-xs sm:text-xl rounded-full border-2 font-semibold border-primary text-primary"
          >
            Change Paragraph
          </button>
          <div className="w-20"></div>
        </div>
        <div className="w-3/4 text-md sm:text-3xl mt-16 ">{text}</div>
      </div>
      <ParkinsonMic checkResult={checkResult} setOpen={setOpen} />
      <ParkinsonResult
        onClose={reset}
        open={open}
        setOpen={setOpen}
        data={data}
      />
    </div>
  );
}
