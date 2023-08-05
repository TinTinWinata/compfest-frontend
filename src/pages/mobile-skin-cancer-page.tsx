import Webcam from 'react-webcam';

import { Player } from '@lottiefiles/react-lottie-player';
import { BrowserView, MobileView } from 'react-device-detect';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

export default function MobileSkinCancerPage() {
  const handleScreenshot = (src: string) => {};
  return (
    <div className="w-full h-full center bg-primary">
      <MobileView>
        <div className="m-10 video-wrapper relative">
          <div className="absolute z-0 left-[-40px]  top-10  translate-y-[-100%]">
            <Player autoplay loop className="w-52" src={'/person.json'} />
          </div>
          <Webcam
            audio={false}
            style={{ position: 'relative', zIndex: 10 }}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }: any) => (
              <button
                className="w-full mt-5 rounded-lg bg-white py-3 text-primary font-bold text-xl"
                onClick={() => {
                  handleScreenshot(getScreenshot());
                }}
              >
                Take Photo
              </button>
            )}
          </Webcam>
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
