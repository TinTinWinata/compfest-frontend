import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import Modal, { IModalProps } from '../../components/modal';
import { useUserAuth } from '../../contexts/user-context';
import { IAIParkinsonResponse } from '../../interfaces/ai-parkinson-interface';
import { ITest } from '../../interfaces/user-firestore-interface';

interface IParkinsonResultProps extends IModalProps {
  data: IAIParkinsonResponse | null;
  onClose: () => void;
}

export default function ParkinsonResult({
  open,
  setOpen,
  data,
  onClose,
}: IParkinsonResultProps) {
  const { saveDesease } = useUserAuth();
  const saveProfile = () => {
    if (data) {
      const test: ITest = {
        answers: {},
        name: 'Parkinson Test',
        result: data.result,
      };
      saveDesease(test);
    }
  };
  useEffect(() => saveProfile(), [data]);
  return (
    <Modal
      canBeClose={data !== null}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      {data ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="center">
            {data.result == 0 ? (
              <Player
                className="w-52 h-52"
                autoplay
                loop
                src="/assets/strong.json"
              />
            ) : (
              <Player
                className="w-52 h-52"
                autoplay
                loop
                src="/assets/sickness.json"
              />
            )}
          </div>
          <div className="flex text-lg flex-col justify-center items-center ">
            <p className="font-semibold text-center">
              Succesfully Predicting! This is your Result:{' '}
            </p>
            <p className="font-bold mb-3 text-center">
              {data.result == 0 ? 'You Are Safe' : 'You Are Not Safe'}
            </p>
            <p className="text-red-400 font-semibold text-xs text-center">
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
          <div className="center text-gray-500 ">
            Please wait were analysis your results..
          </div>
        </div>
      )}
    </Modal>
  );
}
