import { Player } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import useJoinRoom from '../../hooks/useJoinRoom';
import SkinCancerResult from './skin-cancer-result';

export default function MobileSkinCancerPage() {
  const { id } = useParams();
  if (id) {
    const [resultModal, setResultModal] = useState<boolean>(false);
    const { localRef, webcamActive, setupSources, data, screenshotLocal } =
      useJoinRoom(id, 'join');
    const handleScreenshot = () => {
      screenshotLocal();
      setResultModal(true);
    };

    return (
      <div className="w-full h-screen overflow-hidden center bg-primary">
        <MobileView>
          <div className="m-10 h-full center video-wrapper relative ">
            {webcamActive && (
              <>
                <div className="absolute z-0 left-[-40px]  top-10  translate-y-[-100%]">
                  <Player
                    autoplay
                    loop
                    className="w-52"
                    src={'/assets/person.json'}
                  />
                </div>
              </>
            )}
            <video
              ref={localRef}
              autoPlay
              playsInline
              muted
              className={`relative z-10 w-[80%] h-[80%] ${
                webcamActive ? 'block' : 'hidden'
              } `}
            ></video>
          </div>
          {!webcamActive ? (
            <button
              onClick={setupSources}
              className="p-5 bg-white font-semibold text-gray-500 rounded-md"
            >
              Start Video
            </button>
          ) : (
            <div className="center">
              <button
                onClick={handleScreenshot}
                className=" text-gray-800 bg-white border-white py-3 w-[60%] rounded-full border hover:bg-primary hover:text-white transition-all font-semibold"
              >
                Take Screenshot
              </button>
            </div>
          )}
          <SkinCancerResult
            open={resultModal}
            setOpen={setResultModal}
            data={data}
          />
        </MobileView>
        <BrowserView>
          <div className="text-white font-bold text-center m-10 text-[40px]">
            Sorry only available for mobile
          </div>
        </BrowserView>
      </div>
    );
  }
  return <></>;
}
