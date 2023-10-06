import { useState } from 'react';
import { IAIParkinsonResponse } from '../interfaces/ai-parkinson-interface';
import { toastSuccess } from '../settings/toast-setting';

export default function useParkinsonDemo() {
  const [data, setData] = useState<IAIParkinsonResponse | null>(null);
  const fakeData: IAIParkinsonResponse = {
    result: 0,
    status: 'You Are Safe',
  };

  const [isLoading, setLoading] = useState<boolean>(false);
  const checkResult = async (payload: any) => {
    setLoading(true);
    setTimeout(() => {
      setData(fakeData);
      toastSuccess('Succesfully predict data!');
      setLoading(false);
    }, 3000);
  };

  return { checkResult, data, isLoading };
}
