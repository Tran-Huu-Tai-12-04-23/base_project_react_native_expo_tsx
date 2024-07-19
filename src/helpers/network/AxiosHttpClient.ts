// import React from "react";
import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import {IObject, IObjectPromise, Utils} from '../utils';
import {ApiException} from './common';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAxiosRequestOptions extends AxiosRequestConfig {
  headers?: IObject | string[][];
}
export interface IAxiosResponse<T extends any> extends AxiosResponse {}
export class AxiosHttpClient {
  private baseUrl: string;
  private options: IAxiosRequestOptions;
  private interceptors: IObjectPromise;
  private instance: AxiosInstance;
  constructor(config: {
    baseurl: string;
    options: IAxiosRequestOptions;
    interceptors?: IObjectPromise;
  }) {
    const {baseurl = '', options = {}, interceptors = {}} = config;
    this.baseUrl = baseurl;
    this.options = options;
    if (interceptors) {
      this.interceptors = interceptors;
    } else {
      this.interceptors = {};
    }
    this.instance = Axios.create({
      baseURL: baseurl,
      ...options,
    });
  }

  private handerError(error?: any): ApiException {
    if (!error) {
      return new ApiException('Lỗi', 500);
    }
    if (!error.isAxiosError) {
      if (error.message) {
        return new ApiException(error.message, 500);
      }
      return new ApiException('Lỗi', 500);
    }
    const {response, message = 'Lỗi'} = error as AxiosError;
    if (response) {
      const {data = {}, status = 500} = response;
      return new ApiException(message, status, data);
    }
    return new ApiException(message, 500);
  }

  private async intercept() {
    const headerAppend = await Utils.promiseAllObject(this.interceptors);
    return headerAppend;
  }

  async get<T>(
    endpoint: string,
    params: any = {},
    body: any = {},
  ): Promise<IAxiosResponse<T>> {
    try {
      // const headers = await this.intercept();
      // const paramUrls = new URLSearchParams(body).toString();
      // const url = (endpoint + params).trim();
      // return await this.instance.get(url, { headers }, paramUrls)
      const headers: any = await this.intercept();
      //const authorization = await headers.Authorization();

      const url = (endpoint + params).trim();
      const query = this.objToQueryString(body);
      return await this.instance.get(`${url}?${query}`, {
        headers, //: //{Authorization: authorization},
      });
    } catch (error) {
      throw this.handerError(error);
    }
  }
  async post<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers: any = await this.intercept();
      const url = endpoint.trim();
      return await this.instance.post(url, body, {
        headers, //: {Authorization: authorization},
      });
    } catch (error) {
      throw this.handerError(error);
    }
  }

  async put<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = endpoint.trim();
      return await this.instance.put(url, body, {
        headers,
      });
    } catch (error) {
      throw this.handerError(error);
    }
  }

  async patch<T>(endpoint: string, body: any = {}): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();

      const url = endpoint.trim();
      return await this.instance.patch(url, body, {
        headers,
      });
    } catch (error) {
      throw this.handerError(error);
    }
  }
  async delete<T>(
    endpoint: string,
    body: any = {},
  ): Promise<IAxiosResponse<T>> {
    try {
      const headers = await this.intercept();
      const url = endpoint.trim();
      return await this.instance.delete(url, {
        headers,
        data: body,
      });
    } catch (error) {
      throw this.handerError(error);
    }
  }

  private objToQueryString = obj =>
    Object.keys(obj)
      .map(k => {
        if (Array.isArray(obj[k])) {
          return `${k}=${JSON.stringify(obj[k])}`;
        }
        return `${k}=${obj[k]}`;
      })
      .join('&');
}
