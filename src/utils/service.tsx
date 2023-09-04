import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ContentType } from '../enums/content-type-enum';
import { Method } from '../enums/method-enum';

import { IEndpoint } from '../interfaces/endpoint-interface';
import { IBackendResponse } from '../interfaces/service-response-interface';

// Service facade to handle axios
class Service {
  protected axios: AxiosInstance;

  private getContentType(contentType: ContentType): string {
    return contentType == ContentType.JSON
      ? 'application/json'
      : 'multipart/form-data';
  }

  constructor(
    accessToken?: string | null,
    contentType: ContentType = ContentType.JSON
  ) {
    this.axios = axios.create(this.createConfig(accessToken, contentType));
  }

  private createConfig(
    accessToken?: string | null,
    contentType: ContentType = ContentType.JSON
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: this.getContentType(contentType),
        // 'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };
    return config;
  }

  private async getResponse(
    method: Method,
    data: any,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<any> {
    // Return any because it can return anything (response from backend server)
    if (method === Method.GET) return await this.axios.get(url, config);
    else if (method === Method.POST) return await this.axios.post(url, data);
    else if (method === Method.PUT)
      return await this.axios.put(url, data, config);
    else if (method === Method.PATCH)
      return await this.axios.patch(url, data, config);
    else if (method === Method.DELETE)
      return await this.axios.delete(url, config);
  }

  public generateUrl(endpoint: IEndpoint, id: string = '', param: any = {}) {
    const baseURL = import.meta.env.VITE_API_URL;
    let url = baseURL + endpoint.url;
    url += id ? `/${id}` : ``;

    Object.keys(param).forEach((key, index) => {
      const prefix = index === 0 ? '?' : '&';
      url += `${prefix}${key}=${param[key]}`;
    });
    return url;
  }

  public async request<T>(
    endpoint: IEndpoint,
    id: string = '',
    data: any = {},
    param: any = {}
  ) {
    let result: IBackendResponse<T> = {
      data: null,
      message:
        'Sorry we have technical issues, please try again later. Have a nice day.',
      success: false,
    };
    try {
      const url = this.generateUrl(endpoint, id, param);
      //   console.log('[SERVICE] url : ', url);
      const response = await this.getResponse(endpoint.method, data, url);
      // !Debugging Purposes
      //   console.log('[SERVICE] request data : ', data);
      //   console.log('[SERVICE] response : ', response);

      result.data = response.data;
      result.message = response.statusText;
      result.success = true;
    } catch (error) {
      // console.log('[ERROR] response : ', error);
      const { response } = error as any;

      result = response
        ? { data: null, success: false, message: response.data.message }
        : {
            data: null,
            success: false,
            message:
              'Sorry we have technical issues, please try again later. Have a nice day.',
          };
    }
    return result;
  }
}

export default Service;
