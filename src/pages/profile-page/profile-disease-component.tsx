import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import { ITest } from '../../interfaces/user-firestore-interface';

interface IProfileDiseaseComponentProps {
  test: ITest;
}

export default function ProfileDiseaseComponent({
  test,
}: IProfileDiseaseComponentProps) {
  const [isHide, setHide] = useState<boolean>(true);
  const isHaveAnswers = () => Object.keys(test).length > 0;
  const handleClickHide = () => {
    if (isHaveAnswers()) {
      setHide((prev) => !prev);
    }
  };
  const isSave = test.result < 0.5;
  const isAnn = test.result !== 0 && test.result !== 1;
  return (
    <div className="shadow-sm px-8 py-4 border rounded-md  text-gray-500">
      <div className="flex justify-between">
        <div className="gap-2 flex items-center justify-start">
          <div className="font-semibold">{test.name}</div>
          {isAnn && (
            <div className="center">
              ({(test.result * 10).toFixed(2)} % Potentials)
            </div>
          )}
          {isSave ? (
            <div className="rounded-full text-white font-bold bg-green-600 px-2 py-1 text-xs w-fit">
              Save
            </div>
          ) : (
            <div className="rounded-full text-white font-bold bg-red-600 px-2 py-1 text-xs w-fit">
              Not Save
            </div>
          )}
        </div>
        <div
          onClick={handleClickHide}
          className="text-gray-400 center cursor-pointer p-2 mr-2 transition-all hover:bg-gray-100 rounded-full"
        >
          {isHaveAnswers() && (
            <>
              {isHide ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeLowVision className="w-5 h-5" />
              )}
            </>
          )}
        </div>
      </div>
      <div className={`transition:all ${isHide ? 'hidden' : 'block'}`}>
        <div className="center">
          <hr className="my-5 w-full" />
        </div>
        <div className="center w-full">
          <div className="gap-y-1 grid grid-cols-3 w-full">
            {Object.entries(test.answers).map(([key, value]) => (
              <div className=" text-xs flex gap-2" key={key}>
                <div className="">{key} : </div>
                <div className="">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
