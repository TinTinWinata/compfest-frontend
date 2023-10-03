import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { BiArrowBack } from 'react-icons/bi';
import QRCode from 'react-qr-code';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUserAuth } from '../../contexts/user-context';
import useHostRoom from '../../hooks/useHostRoom';
import { toastSuccess } from '../../settings/toast-setting';
import SkinCancerResult from './skin-cancer-result';
import SkinCancerTutorial from './skin-cancer-tutorial';

export default function SkinCancerPage() {
  const { user } = useUserAuth();
  const [uuid, setUuid] = useState<string>(user ? user.uid : uuidv4());
  const [firstSetup, setFirstSetup] = useState<boolean>(true);
  const navigate = useNavigate();
  const {
    hangUp,
    remoteRef,
    setupSources,
    isIncomeStream,
    screenshotRemote,
    data,
    reset,
  } = useHostRoom(uuid, 'create');
  const [resultModal, setResultModal] = useState<boolean>(false);

  const handleScreenshot = () => {
    setResultModal(true);
    screenshotRemote();
  };

  const getLink = () => `${import.meta.env.VITE_URL}/skin-cancer/${uuid}`;

  if (isMobile) {
    window.location.href = getLink();
  }

  const onHandleClick = () => {
    navigator.clipboard.writeText(getLink());
    toastSuccess('Coppied to clipboard.');
  };

  const handleClickFirst = () => {
    setFirstSetup(false);
    setupSources();
  };

  useEffect(() => {
    if (data) {
      setResultModal(true);
    }
  }, [data]);

  if (isMobile) {
    return (
      <div className="bg-primary w-full min-h-screen h-full center">
        <div className="center flex-col text-white font-bold text-xl">
          <Player
            autoplay
            loop
            className="w-[300px]"
            src="./assets/brain.json"
          />
          <p>Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen center relative overflow-hidden">
      <div className="w-full h-full center">
        <div className="border-gray-500 relative border border-opacity-20 rounded-[5%] w-[70%] h-[80%] center">
          <div className="absolute left-10 top-0 translate-y-[-100%] pb-2">
            <Link
              to="/home"
              className="w-20 text-primary center gap-1 hover:underline cursor-pointer"
            >
              <div className="center">
                <BiArrowBack className="w-3 h-3" />
              </div>
              <div className="">Back</div>
            </Link>
          </div>
          <div className="flex flex-col gap-4 ">
            <video
              playsInline
              autoPlay
              muted
              className={
                'w-[500px] h-[500px] rounded-md ' +
                (isIncomeStream ? ' block ' : ' hidden ')
              }
              ref={remoteRef}
            ></video>
            {isIncomeStream && (
              <div className="center">
                <button
                  onClick={handleScreenshot}
                  className="w-full text-gray-800 border-primary p-3 rounded-full border hover:bg-primary hover:text-white transition-all font-semibold"
                >
                  Take Screenshot
                </button>
              </div>
            )}
          </div>
          <div className="absolute left-[50%] top-0 translate-y-[-50%] text-center w-[60%] translate-x-[-50%] bg-white p-5">
            <h1 className="text-primary text-[50px] font-bold">Upload Image</h1>
            <p className="font-semibold text-gray-500">
              Open this website on your mobile devices
            </p>
          </div>
          <SkinCancerResult
            onClose={reset}
            open={resultModal}
            setOpen={setResultModal}
            data={data}
          />
          {!isIncomeStream && (
            <div className="flex flex-col gap-5 items-center justify-center w-fit h-fit">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={getLink()}
                viewBox={`0 0 256 256`}
              />
              <p className="text-gray-500">
                Or you can get link to your clipboard
              </p>
              <button
                onClick={onHandleClick}
                className="focus:outline-none transition:all hover:bg-primary hover:text-white px-24 py-3  font-bold text-xl rounded-full  text-primary bg-white border border-primary"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
      <SkinCancerTutorial handleClick={handleClickFirst} first={firstSetup} />
    </div>
  );
}
