import { useState } from 'react';
import { IAISkinCancerResponse } from '../interfaces/ai-skin-cancer-response-interface';
import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastError, toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function useSkinCancer() {
  const [data, setData] = useState<IAISkinCancerResponse | null>(null);
  const checkResult = async (data: any) => {
    const textnode = document.createTextNode('TEST');
    document.body.appendChild(textnode);
    if (data && data.result !== undefined && data.result !== '') {
      const link = data.result as string;
      const service = new Service();
      const response = await service.request<IAISkinCancerResponse>(
        ENDPOINT_LIST.ai.dcnn,
        undefined,
        {
          link,
        }
      );
       if (response.success && response.data) {
        setData(response.data);
        toastSuccess('Succesfully predict data!');
      } else {
        toastError(response.message);
      }
    }
  };
  return { checkResult, data };
}
