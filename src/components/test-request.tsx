import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function TestRequest() {
  const handler = async () => {
    const service = new Service();
    const response = await service.request(ENDPOINT_LIST.test);
    if (response.success) {
      toastSuccess('Succesfully request to backend!');
    }
  };
  return <button onClick={handler}>Test Request</button>;
}
