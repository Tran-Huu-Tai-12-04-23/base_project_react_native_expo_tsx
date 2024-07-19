import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax'
import { Subscriber } from 'rxjs'
import { IObject, IObjectPromise, Utils } from '../utils'

export interface IRxRequestOptions {
    user?: string;
    async?: boolean;
    headers?: IObject,
    timeout?: number;
    password?: string;
    hasContent?: boolean;
    crossDomain?: boolean;
    withCredentials?: boolean;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: Subscriber<any>;
    responseType?: string;

}
export interface IRxRequest extends IRxRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url?: string;
    body?: any;
}
export interface IRxResponse<T extends any> extends AjaxResponse {
    response: T
}
export class RxHttpClient {
    private baseUrl: string
    private options: IRxRequestOptions
    private interceptors: IObjectPromise
    constructor(config: {
        baseurl: string, options: IRxRequestOptions, interceptors?: IObjectPromise
    }) {
        const { baseurl = '', options = {}, interceptors = {} } = config
        this.baseUrl = baseurl
        this.options = options
        if (interceptors) {
            this.interceptors = interceptors
        } else {
            this.interceptors = {};
        }
    }

    private async intercept() {
        const headerAppend = await Utils.promiseAllObject(this.interceptors);
        return headerAppend;
    }
    private async appendHeader() {
        const headerAppend = await this.intercept();
        const headers = Object.assign({}, this.options.headers, headerAppend)
        return headers
    }
    async get<T>(endpoint: string, params: any = {}): Promise<IRxResponse<T>> {
        const headers = await this.appendHeader();
        const newOptions = Object.assign({}, this.options, {
            headers
        })
        const paramUrls = new URLSearchParams(params).toString();
        const url = (this.baseUrl + endpoint + paramUrls).trim();
        const options: IRxRequest = {
            ...newOptions,
            method: 'GET',
            url: url,
        }
        return ajax(options).toPromise()
    }
    async post<T>(endpoint: string, body: any = {}): Promise<IRxResponse<T>> {
        const headers = await this.appendHeader();
        const newOptions = Object.assign({}, this.options, {
            headers: headers
        })
        const options: IRxRequest = {
            ...newOptions,
            method: 'POST',
            url: (this.baseUrl + endpoint).trim(),
            body: body
        }
        return ajax(options).toPromise();
    }
    async put<T>(endpoint: string, body: any = {}): Promise<IRxResponse<T>> {
        const headers = await this.appendHeader();
        const newOptions = Object.assign({}, this.options, {
            headers
        })
        const options: IRxRequest = {
            ...newOptions,
            method: 'PUT',
            url: (this.baseUrl + endpoint),
            body: body
        }
        return ajax(options).toPromise()
    }
    async patch<T>(endpoint: string, body: any = {}): Promise<IRxResponse<T>> {
        const headers = await this.appendHeader();
        const newOptions = Object.assign({}, this.options, {
            headers
        })
        const options: IRxRequest = {
            ...newOptions,
            method: 'PATCH',
            url: (this.baseUrl + endpoint),
            body: body
        }
        return ajax(options).toPromise()
    }
    async delete<T>(endpoint: string, body: any = {}): Promise<IRxResponse<T>> {
        const headers = await this.appendHeader();
        const newOptions = Object.assign({}, this.options, {
            headers
        })
        const options: IRxRequest = {
            ...newOptions,
            method: 'DELETE',
            url: (this.baseUrl + endpoint),
            body: body
        }
        return ajax(options).toPromise()
    }
}

