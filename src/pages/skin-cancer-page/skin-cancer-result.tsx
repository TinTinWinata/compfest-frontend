import { Player } from '@lottiefiles/react-lottie-player';
import Modal, { IModalProps } from '../../components/modal';
import { IAISkinCancerResponse } from '../../interfaces/ai-skin-cancer-response-interface';

interface ISkinCancerResultProps extends IModalProps {
  data: IAISkinCancerResponse | null;
}

export default function SkinCancerResult({
  data,
  open,
  setOpen,
}: ISkinCancerResultProps) {
  console.log('data : ', data);
  return (
    <Modal open={open} setOpen={setOpen}>
      {data ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="center">
            <Player
              className="w-52 h-52"
              autoplay
              loop
              src="/assets/strong.json"
            />
          </div>
          <div className="flex text-lg flex-col justify-center items-center ">
            <p className="font-semibold">
              Succesfully Predicting! This is your Result:{' '}
            </p>
            <p>
              {data.result.result} ({data.result.value}%)
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
          <div className="center">Please wait were analysis your results..</div>
        </div>
      )}
    </Modal>
  );
}
