import MicRecorder from 'mic-recorder-to-mp3';
import { useEffect, useState } from 'react';
import { HiMiniMicrophone } from 'react-icons/hi2';
import useSound from 'use-sound';
import soundData from '../../../public/assets/sound-click.mp3';
import useParkinson from '../../hooks/useParkinson';
import { toastError } from '../../settings/toast-setting';
import { getSecondsBetweenDates } from '../../utils/date-helper';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default function ParkinsonMic() {
  const [record, setRecord] = useState<boolean>(false);
  const [time, setTime] = useState<Date>();
  const [play] = useSound(soundData);
  const { checkResult, data } = useParkinson();
  const TIME_VALIDATION = 3;

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
    convertBlobURLToFile(recordedBlob, 'tester')
      .then((file) => {
        // downloadFile(file);
        checkResult(file);
      })
      .catch((error) => {
        console.log(error);
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

  //   const handle = (e: ChangeEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const file = e.target.file.files[0];
  //     checkResult(file);
  //   };
  return (
    <>
      {/* <form onSubmit={handle}>
        <input name="file" type="file"></input>
        <button type="submit">submit</button>
      </form> */}
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
        <div className="z-0 top-[100px] translate-y-[-100%] absolute w-full react-mic-wrapper"></div>
      </div>
    </>
  );
}
