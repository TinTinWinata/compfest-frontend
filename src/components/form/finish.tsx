import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/user-context';
import { IAIResponse } from '../../interfaces/ai-response-interface';
import { IEndpoint } from '../../interfaces/endpoint-interface';
import { IFormAnswer } from '../../interfaces/form-answer';
import { ITest } from '../../interfaces/user-firestore-interface';
import { toastError } from '../../settings/toast-setting';
import Service from '../../utils/service';
import TestRequest from '../test-request';

export interface IFormFinishProps {
  answers: IFormAnswer[];
  endpoint: IEndpoint;
  name: string;
}

export interface IResultType {
  [key: string]: number;
}

export default function Finish({ answers, endpoint, name }: IFormFinishProps) {
  const { saveDesease } = useUserAuth();
  const [data, setData] = useState<IAIResponse | null>(null);
  const navigate = useNavigate();

  const getResult = (): number => {
    if (data) {
      if (Array.isArray(data.result)) {
        return getResult();
      }
      return data.result;
    }
    return -1;
  };

  const fetch = async () => {
    const service = new Service();
    const data: IResultType = dataConverter(answers);
    console.log('endpoint : ', endpoint);
    console.log('data : ', data);
    const response = await service.request<IAIResponse>(
      endpoint,
      undefined,
      data
    );
    console.log('response data : ', response.data);
    if (response.success && response.data) {
      setData(response.data);
      const test: ITest = {
        answers: data,
        name: name,
        result: getResult(),
      };
      saveDesease(test);
    } else {
      console.log('response : ', response);
      toastError(response.message);
    }
  };

  const dataConverter = (answers: IFormAnswer[]): {} => {
    return answers.reduce((acc: IResultType, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
  };

  useEffect(() => {
    fetch();
  }, [answers]);

  const handleBack = () => navigate('/');
  const getLottieAsset = (): string => {
    if (data && getResult() >= 0.5) {
      return '/assets/sickness.json';
    } else if (data && getResult() < 0.5) {
      return '/assets/strong.json';
    }
    return '/assets/loading.json';
  };

  const getLottieString = (): string => {
    if (!data) {
      return 'Please wait were checking all your answers!';
    } else if (getResult() >= 0.5) {
      return 'Kamu harus senantiasa menjaga kesehatan dengan pola makan sehat, olahraga teratur, dan memantau kadar gula darah untuk mencegah terjadinya komplikasi yang bisa membahayakan kesehatan saya di masa depan.';
    } else if (getResult() < 0.5) {
      return 'Kamu aman! Harus tetap menjaga kesehatan dengan pola makan yang sehat dan aktif berolahraga agar terhindar dari risiko diabetes dan memiliki gaya hidup yang lebih sehat dan bugar.';
    }
    return '/assets/loading.json';
  };
  const getLottieTitle = (): string => {
    if (!data) {
      return '';
    } else if (getResult() >= 0.5) {
      return 'Kamu tidak aman';
    } else if (getResult() < 0.5) {
      return 'Kamu aman';
    }
    return '/assets/loading.json';
  };

  return (
    <>
      <div onClick={handleBack} className="relative w-fit flex cursor-pointer">
        <div className="center">
          <FaArrowLeft className="w-3 h-3 text-gray-500" />
        </div>
        <div className="ml-2 mt-2 text-gray-500 mb-2 text-sm">Back</div>
      </div>
      <hr />
      <div className="text-center  flex flex-col center w-full h-full">
        <Player className="w-52 h-52" src={getLottieAsset()} autoplay loop />
        <h3 className="font-semibold text-2xl ">{getLottieTitle()}</h3>
        <p className="mt-2 text-gray-500 ">{getLottieString()}</p>

        {/* Invicible Button */}
        <div className="h-16"></div>
        {/* Real Button */}
        {/* Debug Button */}
        <button onClick={fetch}>Fetch Again</button>
        <TestRequest />
        <Link
          to="/home"
          className="absolute px-2 py-3 rounded-b-lg bottom-0 font-semibold   text-gray-50  transition-all w-full bg-accent "
        >
          Home
        </Link>
      </div>
    </>
  );
}
