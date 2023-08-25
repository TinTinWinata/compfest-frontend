export interface IAISkinCancerResponse {
  result: {
    predict: [number];
    result: string;
    value: number;
  };
  status: string;
}
