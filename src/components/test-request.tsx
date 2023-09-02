import { ChangeEvent } from 'react';
import useParkinson from '../hooks/useParkinson';
import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function TestRequest() {
  const { checkResult } = useParkinson();
  const handler = async () => {
    const service = new Service();
    const response = await service.request(ENDPOINT_LIST.test);
    console.log('response : ', response);
    if (response.success) {
      toastSuccess('Succesfully request to backend!');
    }
  };
  const postHandler = async () => {
    const service = new Service();
    const response = await service.request(ENDPOINT_LIST.test);
    console.log('response : ', response);
    if (response.success) {
      toastSuccess('Succesfully request to backend!');
    }
  };

  const postStroke = async () => {
    const service = new Service();
    const data = {
      gender: 1,
      age: 32,
      hypertension: 1,
      heart_disease: 1,
      ever_married: 1,
      work_type: 1,
      residence_type: 1,
      avg_glucose_level: 1,
      bmi: 36.6,
      smoking_status: 2,
    };
    const response = await service.request(
      ENDPOINT_LIST.ai.strokeAnn,
      undefined,
      data
    );
    console.log('[TEST] data : ', data);
    console.log('[TEST] response : ', response);
    if (response.success) {
      toastSuccess('Succesfully request to backend!');
    }
  };

  const handleParkinson = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const payload = e.target.files[0];
      if (payload) {
        console.log('[TEST] Checking Result :', payload);
        checkResult(payload);
      }
    }
  };

  return (
    <div className="flex gap-5">
      <button onClick={handler}>Test POST Request</button>
      <button onClick={postHandler}>Test GET Request</button>
      <button onClick={postStroke}>Test POST STROKE Request</button>
      <div className="flex gap-1">
        <p>Test POST Parkinson</p>
        <input onChange={handleParkinson} type="file"></input>
      </div>
    </div>
  );
}
