import { Player } from '@lottiefiles/react-lottie-player';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import useJoinRoom from '../../hooks/useJoinRoom';

export default function MobileSkinCancerPage() {
  const { id } = useParams();
  if (id) {
    const { localRef, webcamActive, setupSources } = useJoinRoom(id, 'join');
    const handleScreenshot = (src: string) => {};
    return (
      <div className="w-full h-full center bg-primary">
        <MobileView>
          <div className="m-10 center video-wrapper relative ">
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
            {!webcamActive && (
              <button
                onClick={setupSources}
                className="p-5 bg-white font-semibold text-gray-500 rounded-md"
              >
                Start Video
              </button>
            )}

            {/* <Webcam
              audio={false}
              style={{ position: 'relative', zIndex: 10 }}
              height={720}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            >
              {({
                getScreenshot,
              }: {
                getScreenshot: () => string;
              }): JSX.Element => (
                <button
                  className="w-full mt-5 rounded-lg bg-white py-3 text-primary font-bold text-xl"
                  onClick={() => {
                    handleScreenshot(getScreenshot());
                  }}
                >
                  Take Photo
                </button>
              )}
            </Webcam> */}
          </div>
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
