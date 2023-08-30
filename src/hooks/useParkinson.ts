import { useState } from 'react';
import { ContentType } from '../enums/content-type-enum';
import { IAIParkinsonResponse } from '../interfaces/ai-parkinson-interface';
import { ENDPOINT_LIST } from '../settings/endpoint-setting';
import { toastError, toastSuccess } from '../settings/toast-setting';
import Service from '../utils/service';

export default function useParkinson() {
  const [data, setData] = useState<IAIParkinsonResponse | null>(null);

  const checkResult = async (data: any) => {
    if (data) {
      const formData = new FormData();
      formData.append('file', data);
    //   !Debugging Purposes
    //   console.log('[FETCHING TO SERVER FILE] : ', data);
    //   console.log('[FETCHING TO SERVER FILE DATA] : ', formData.getAll('file'));
      const service = new Service(null, ContentType.MULTIPART);
      const response = await service.request<IAIParkinsonResponse>(
        ENDPOINT_LIST.ai.parkinson,
        undefined,
        formData
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
