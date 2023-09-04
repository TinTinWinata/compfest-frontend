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
import Appointment from './appointment';

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
        return data.result[0];
      }
      return data.result;
    }
    return -1;
  };

  const fetch = async () => {
    const service = new Service();
    const data: IResultType = dataConverter(answers);
    // console.log(data);
    const response = await service.request<IAIResponse>(
      endpoint,
      undefined,
      data
    );
    if (response.success && response.data) {
      setData(response.data);
      const test: ITest = {
        answers: data,
        name: name,
        result: getResult(),
      };
      saveDesease(test);
    } else {
      toastError(response.message);
    }
  };

  const dataConverter = (answers: IFormAnswer[]): {} => {
    // console.log(answers);
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
      return 'Please wait, we are checking your answer!';
    } else if (getResult() >= 0.5) {
      return 'You should always maintain your health with a healthy diet and regular exercise to prevent complications that could harm your health in the future.';
    } else if (getResult() < 0.5) {
      return 'You are safe! You must maintain your health with a healthy diet and active exercise to avoid the risk of deadly diseases and have a healthier and fitter lifestyle.';
    }
    return '';
  };
  const getLottieTitle = (): string => {
    if (!data) {
      return '';
    } else if (getResult() >= 0.5) {
      return 'You are not safe';
    } else if (getResult() < 0.5) {
      return 'You are safe';
    }
    return '';
  };

  return (
    <div className="bg-primary w-full h-screen gap-3 overflow-hidden center">
      <div className="relative p-6 w-[1000px] h-[90%] bg-gray-50 rounded-xl ">
        <div
          onClick={handleBack}
          className="center  relative w-fit flex cursor-pointer"
        >
          <FaArrowLeft className="w-3 h-3 text-gray-500" />
          <div className="ml-2 mt-2 text-gray-500 mb-2 text-sm">Back</div>
        </div>
        <hr />
        {/* Real Button */}
        {/* Debug Button */}
        {/* <button onClick={fetch}>Fetch Again</button>
        <TestRequest /> */}
        <div className="text-center  flex flex-col pb-20 center w-full h-full">
          <Player className="w-52 h-52" src={getLottieAsset()} autoplay loop />
          <h3 className="font-semibold text-2xl ">{getLottieTitle()}</h3>
          <p className="mt-4 text-gray-500 w-3/4">{getLottieString()}</p>

          {/* Invicible Button */}
          {data && (
            <>
              <hr className="my-10 w-3/4" />

              <div className="flex gap-4">
                <Appointment
                  link="https://www.halodoc.com/tanya-dokter"
                  name="Alodoc"
                  icon="assets/halodoc.png"
                />
                <Appointment
                  icon="assets/klik-dokter.png"
                  link="https://www.klikdokter.com/tanya-dokter"
                  name="Klik Dokter"
                />
                <Appointment
                  icon="assets/link-sehat.png"
                  link="https://linksehat.com/tanya-dokter"
                  name="Link Sehat"
                />
              </div>
            </>
          )}
          <Link
            to="/home"
            className="absolute px-2 py-3 rounded-b-lg bottom-0 font-semibold   text-gray-50  transition-all w-full bg-accent "
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
