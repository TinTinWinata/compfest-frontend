import MicRecorder from 'mic-recorder-to-mp3';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiMiniMicrophone } from 'react-icons/hi2';
import useSound from 'use-sound';
import soundData from '../../../public/assets/sound-click.mp3';
import { toastError } from '../../settings/toast-setting';
import { getSecondsBetweenDates } from '../../utils/date-helper';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

interface IParkinsonMicProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  checkResult: (val: any) => Promise<void>;
}

export default function ParkinsonMic({
  setOpen,
  checkResult,
}: IParkinsonMicProps) {
  const [record, setRecord] = useState<boolean>(false);
  const [time, setTime] = useState<Date>();
  const [play] = useSound(soundData);
  const TIME_VALIDATION = 4;

  const isValid = (): boolean => {
    if (time) {
      const now = new Date();
      const diffSecond = getSecondsBetweenDates(time, now);
      if (diffSecond > TIME_VALIDATION) {
        return true;
      } else {
        // !Debugging Purposes
        // console.log(diffSecond);
        toastError(
          'You need to provide at least ' + TIME_VALIDATION + ' second'
        );
      }
    }
    return false;
  };

  const convertBlobURLToFile = async (blobData: Blob, filename: string) => {
    const file = new File([blobData], filename, {
      type: blobData.type,
    });

    return file;
  };

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true });
    }
  }, []);

  const downloadFile = (file: any) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = file.name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const onStop = async (recordedBlob: any) => {
    convertBlobURLToFile(recordedBlob, 'tester.mp3')
      .then((file) => {
        setOpen(true);
        // downloadFile(file);
        // console.log('[FILE] : ', file);
        checkResult(file);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleMouseUp = () => {
    if (record) {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]: any) => {
          setRecord(false);
          if (blob.size > 1 && isValid()) {
            onStop(blob);
          }
        })
        .catch((e: any) => console.log(e));
    }
  };

  const handleMouseDown = () => {
    Mp3Recorder.start()
      .then(() => {
        setRecord(true);
        setTime(new Date());
      })
      .catch((e: any) => console.error(e));
    play();
  };
  return (
    <>
      <div className="absolute  w-full h-[30%] bottom-[-50px] sm:bottom-0 left-0 ">
        <div
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          className={`cursor-pointer z-20 absolute top-10 left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full  w-[150px] h-[150px] sm:w-[300px] sm:h-[300px]  border-4 ${
            !record
              ? ' bg-white text-primary border-primary '
              : ' bg-primaryHover text-white border-white '
          }  center`}
        >
          <div className="center">
            <HiMiniMicrophone className=" sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]" />
          </div>
        </div>
        <div className="z-10 w-full bg-primary h-full rounded-t-3xl absolute left-0 bottom-0"></div>
      </div>
    </>
  );
}
