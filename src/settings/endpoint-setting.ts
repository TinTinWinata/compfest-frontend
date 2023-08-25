import { Method } from '../enums/method-enum';
import { IEndpoint } from '../interfaces/endpoint-interface';

// Example endpoint configuration, that will be used for service.tsx

export interface EndpointList {
  auth: AuthEndpoint;
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

interface AuthEndpoint {
  login: IEndpoint;
}

const AUTH_ENDPOINT: AuthEndpoint = {
  login: {
    method: Method.POST,
    url: '/auth/login',
  },
};

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
  auth: AUTH_ENDPOINT,
  ai: AI_ENDPOINT,
};
