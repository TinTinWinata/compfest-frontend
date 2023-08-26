import { Method } from '../enums/method-enum';
import { IEndpoint } from '../interfaces/endpoint-interface';

// Example endpoint configuration, that will be used for service.tsx

export interface EndpointList {
  test: IEndpoint;
  ai: AIEndpoint;
}

interface AIEndpoint {
  diabetes: IEndpoint;
  diabetesAnn: IEndpoint;
  cardiovaskular: IEndpoint;
  cardiovaskularAnn: IEndpoint;
  stroke: IEndpoint;
  strokeAnn: IEndpoint;
  mental: IEndpoint;
  mentalAnn: IEndpoint;
  dcnn: IEndpoint;
}

const AI_ENDPOINT: AIEndpoint = {
  dcnn: {
    method: Method.POST,
    url: '/dcnn',
  },
  diabetes: {
    method: Method.POST,
    url: '/diabetes',
  },
  diabetesAnn: {
    method: Method.POST,
    url: '/diabetes-ann',
  },
  cardiovaskular: {
    method: Method.POST,
    url: '/cardiovaskular',
  },
  cardiovaskularAnn: {
    method: Method.POST,
    url: '/cardiovaskular-ann',
  },
  mental: {
    method: Method.POST,
    url: '/mental',
  },
  mentalAnn: {
    method: Method.POST,
    url: '/mental-ann',
  },
  stroke: {
    method: Method.POST,
    url: '/stroke',
  },
  strokeAnn: {
    method: Method.POST,
    url: '/stroke-ann',
  },
};

export const ENDPOINT_LIST: EndpointList = {
  test: {
    method: Method.GET,
    url: '/',
  },
  ai: AI_ENDPOINT,
};
