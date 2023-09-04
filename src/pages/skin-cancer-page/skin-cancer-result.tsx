import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import Modal, { IModalProps } from '../../components/modal';
import { useUserAuth } from '../../contexts/user-context';
import { IAISkinCancerResponse } from '../../interfaces/ai-skin-cancer-response-interface';
import { ITest } from '../../interfaces/user-firestore-interface';

interface ISkinCancerResultProps extends IModalProps {
  data: IAISkinCancerResponse | null;
}

export default function SkinCancerResult({
  data,
  open,
  setOpen,
}: ISkinCancerResultProps) {
  const { saveDesease } = useUserAuth();
  const saveProfile = () => {
    if (data) {
      const test: ITest = {
        answers: {},
        name: 'Skin Cancer',
        result: data.result.predict[data.result.value],
      };
      saveDesease(test);
    }
  };
  const getPercentage = () =>
    data ? data.result.predict[data.result.value] * 100 : 0;
  useEffect(() => saveProfile(), [data]);
  return (
    <Modal open={open} setOpen={setOpen}>
      {data ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="center">
            <Player
              className="w-52 h-52"
              autoplay
              loop
              src="/assets/skin.json"
            />
          </div>
          <div className="flex text-lg gap-3 flex-col justify-center items-center ">
            <p className="font-semibold">
              Success Prediction! Your Skin Disease Is :{' '}
            </p>
            <p className="font-bold">
              {data.result.result} ({getPercentage().toFixed(2)}%)
            </p>
            <p className="text-red-400  font-semibold text-xs">
              * warning this is only a prediction *
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="center">
            <Player
              className="w-52 h-52"
              autoplay
              loop
              src="/assets/loading.json"
            />
          </div>
          <div className="center text-gray-500">
            Please wait were analysis your results..
          </div>
        </div>
      )}
    </Modal>
  );
}
