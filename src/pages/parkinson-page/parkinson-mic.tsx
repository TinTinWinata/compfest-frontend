import { useState } from 'react';
import { HiMiniMicrophone } from 'react-icons/hi2';
import { ReactMic } from 'react-mic';
import useSound from 'use-sound';
import soundData from '../../../public/assets/sound-click.mp3';

export default function ParkinsonMic() {
  const [record, setRecord] = useState<boolean>(false);
  const [play] = useSound(soundData);

  const handleClick = () => {
    if (!record) play();
    setRecord((prev) => !prev);
  };

  const onData = (recordedBlob: any) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob: any) => {
    console.log('recordedBlob is: ', recordedBlob);
  };

  const handleMouseUp = () => {
    setRecord(false);
  };

  const handleMouseDown = () => {
    play();
    setRecord(true);
  };

  return (
    <>
      <div className="absolute  w-full h-[30%] bottom-0 left-0 ">
        <div
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          className={`cursor-pointer z-20 absolute top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full  w-[300px] h-[300px]  border-4 ${
            !record
              ? ' bg-white text-primary border-primary '
              : ' bg-primaryHover text-white border-white '
          }  center`}
        >
          <div className="center">
            <HiMiniMicrophone className=" w-[100px] h-[100px]" />
          </div>
        </div>
        <div className="z-10 w-full bg-primary h-full rounded-t-3xl absolute left-0 bottom-0"></div>
        <div className="z-0 top-[100px] translate-y-[-100%] absolute w-full react-mic-wrapper">
          <ReactMic
            record={record}
            className="sound-wave"
            visualSetting="frequencyBars"
            onStop={onStop}
            onData={onData}
            strokeColor="#0552eb"
            backgroundColor="white"
          />
        </div>
      </div>
      {/* <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button> */}
    </>
  );
}
