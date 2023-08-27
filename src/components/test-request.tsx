import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function TestRequest() {
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
    console.log('response : ', response);
    if (response.success) {
      toastSuccess('Succesfully request to backend!');
    }
  };

  return (
    <div className="flex gap-5">
      <button onClick={handler}>Test POST Request</button>
      <button onClick={postHandler}>Test GET Request</button>
      <button onClick={postStroke}>Test POST STROKE Request</button>
    </div>
  );
}
