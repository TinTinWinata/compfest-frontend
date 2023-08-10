import { Player } from '@lottiefiles/react-lottie-player';
import { isMobile } from 'react-device-detect';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '../settings/toast-setting';

export default function SkinCancerPage() {
  const uuid = 'ef3ce0bc-334a-11ee-be56-0242ac120002';
  const navigate = useNavigate();

  const getLink = () => `/skin-cancer/${uuid}`;
  if (isMobile) {
    navigate(getLink());
    window.location.href = getLink();
  }

  const onHandleClick = () => {
    navigator.clipboard.writeText(import.meta.env.VITE_URL + getLink());
    toastSuccess('Coppied to clipboard.');
  };
  return (
    <div className="w-full h-full center">
      <div className="w-full h-full center">
        <div className="border-gray-500 relative border border-opacity-20 rounded-[5%] w-[70%] h-[80%] center">
          <div className="absolute left-[50%] top-0 translate-y-[-50%] text-center w-[60%] translate-x-[-50%] bg-white p-5">
            <h1 className="text-primary text-[50px] font-bold">Upload Image</h1>
            <p className="font-semibold text-gray-500">
              Open this website on your mobile devices
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center w-fit h-fit">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={uuid}
              viewBox={`0 0 256 256`}
            />
            <p className="text-gray-500">
              Or you can get link to your clipboard
            </p>
            <button
              onClick={onHandleClick}
              className="focus:outline-none transition:all hover:bg-primary hover:text-white px-20 py-3  font-bold text-xl rounded-full  text-primary bg-white border border-primary"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-fit px-20 bg-primary shadow-md rounded-l-[5%] center">
        <div className="flex flex-col  justify-center text-white font-bold text-2xl">
          <h1>1. Open Website in Mobile</h1>
          <div className="h-[200px] relative">
            <div className="absolute w-[200px] left-[50%] top-[35%] translate-x-[-50%] translate-y-[-50%]">
              <Player autoplay loop src={'/assets/mobile.json'} />
            </div>
          </div>
          <h1>2. Take a Photo</h1>
          <div className="h-[200px] relative">
            <div className="absolute w-[200px] left-[50%] top-[35%] translate-x-[-50%] translate-y-[-50%]">
              <Player autoplay loop src={'/assets/photo.json'} />
            </div>
          </div>
          <h1>3. Get Result</h1>
          <div className="h-[200px] relative">
            <div className="absolute w-[200px] left-[50%] top-[60%] translate-x-[-50%] translate-y-[-50%]">
              <Player autoplay loop speed={0.5} src={'/assets/health-2.json'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
