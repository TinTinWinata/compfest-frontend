import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';
import Modal, { IModalProps } from '../../components/modal';
import { useUserAuth } from '../../contexts/user-context';
import { IAISkinCancerResponse } from '../../interfaces/ai-skin-cancer-response-interface';
import { ITest } from '../../interfaces/user-firestore-interface';

interface ISkinCancerResultProps extends IModalProps {
  data: IAISkinCancerResponse | null;
  onClose?: () => void;
}

// 0: 'Melanocytic nevi',
// 1: 'Melanoma',
// 2: 'Benign keratosis-like lesions',
// 3: 'Basal cell carcinoma',
// 4: 'Actinic keratoses',
// 5: 'Vascular lesions',
// 6: 'Dermatofibroma',
// 7: 'Clear Skin'

const MAPPED_RESULT = new Map();
MAPPED_RESULT.set(
  'Melanocytic nevi',
  'Commonly known as moles, these are benign growths on the skin due to a proliferation of melanocytes.  '
);
MAPPED_RESULT.set(
  'Melanoma',
  'The most dangerous type of skin cancer. It arises from pigment-producing cells (melanocytes) and can appear as new or changing moles.  '
);
MAPPED_RESULT.set(
  'Benign keratosis-like lesions',
  'Solar Lentigines: Commonly called "liver spots" or "age spots," these are flat, brown spots on the skin due to sun exposure. '
);
MAPPED_RESULT.set(
  'Basal cell carcinoma',
  'Most common type of skin cancer, characterized by pink or pearly white bumps, often with visible blood vessels.  '
);
MAPPED_RESULT.set(
  'Actinic keratoses',
  'Rough, scaly patches on the skin caused by prolonged sun exposure. '
);
MAPPED_RESULT.set(
  'Vascular lesions',
  'Angiomas: Benign growths consisting of small blood vessels. They can appear anywhere on the body. '
);
MAPPED_RESULT.set(
  'Dermatofibroma',
  'Firm, non-cancerous bumps on the skin often caused by minor injury.  '
);
MAPPED_RESULT.set(
  'Clear Skin',
  'Your skin radiates with the vibrant glow of perfect health.'
);

export default function SkinCancerResult({
  data,
  open,
  setOpen,
  onClose,
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

  const getText = () => {
    if (data) {
      const val = MAPPED_RESULT.get(data.result.result);
      if (val) return val;
    }
    return '';
  };

  const getPercentage = () =>
    data ? data.result.predict[data.result.value] * 100 : 0;

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
            <Player
              className="w-52 h-52"
              autoplay
              loop
              src="/assets/skin.json"
            />
          </div>
          <div className="flex text-md sm:text-lg gap-3 flex-col justify-center items-center ">
            {/* <p className="font-semibold center">
              Success Prediction! Your Skin Disease Is :{' '}
            </p> */}
            <div className="">
              <p className="text-center font-bold">
                {data.result.result} ({getPercentage().toFixed(2)}%)
              </p>
              <p className="w-1/2 center text-center text-xs text-gray-400">
                {getText()}
              </p>
            </div>
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
