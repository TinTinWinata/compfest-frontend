import { useEffect, useState } from 'react';
import { ContentType } from '../enums/content-type-enum';
import { IAIParkinsonResponse } from '../interfaces/ai-parkinson-interface';
import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastError, toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function useParkinson() {
  const [data, setData] = useState<IAIParkinsonResponse | null>(null);


  const [isLoading, setLoading] = useState<boolean>(false);
  const checkResult = async (payload: any) => {
    setLoading(true);
    if (payload) {
      const formData = new FormData();
      formData.append('file', payload);
      const service = new Service(null, ContentType.MULTIPART);
      const response = await service.request<IAIParkinsonResponse>(
        ENDPOINT_LIST.ai.parkinson,
        undefined,
        formData
      );
      if (response.success && response.data) {
        console.log('response data  :', response.data);
        setData(response.data);
        toastSuccess('Succesfully predict data!');
      } else {
        toastError('Please provide a valid response (read all the text given)');
      }
    }
    setLoading(false);
  };

  return { checkResult, data, isLoading };
}
