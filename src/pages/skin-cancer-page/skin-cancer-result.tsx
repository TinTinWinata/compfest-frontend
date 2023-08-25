import { IAISkinCancerResponse } from '../../interfaces/ai-skin-cancer-response-interface';

interface ISkinCancerResultProps {
  data: IAISkinCancerResponse;
}

export default function SkinCancerResult({ data }: ISkinCancerResultProps) {
  return <div>Youre an {data.result.value}</div>;
}
