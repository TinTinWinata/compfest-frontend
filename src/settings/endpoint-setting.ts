import { Method } from '../enums/method-enum';
import { IEndpoint } from '../interfaces/endpoint-interface';

// Example endpoint configuration, that will be used for service.tsx

export interface EndpointList {
  auth: AuthEndpoint;
  ai: AIEndpoint;
}

interface AIEndpoint {
  diabetes: IEndpoint;
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
  diabetes: {
    method: Method.POST,
    url: '/diabetes',
  },
};

export const ENDPOINT_LIST: EndpointList = {
  auth: AUTH_ENDPOINT,
  ai: AI_ENDPOINT,
};
