import { Utils, IObjectPromise, IObject } from "../utils"


export interface IRequestOptions extends RequestInit {
    headers?: IObject | string[][],
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: any,
    timeout?: number
}
export interface IResponse<T extends any> extends Response {

}

export class HttpClient {
    private baseUrl: string
    private options: IRequestOptions
    private interceptors: IObjectPromise
    constructor(config: {
        baseurl: string, options: IRequestOptions, interceptors?: IObjectPromise
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
    async get<T>(endpoint: string, params: any = {}): Promise<IResponse<T>> {
        try {
            const headers = await this.appendHeader();
            const newOptions = Object.assign({}, this.options, {
                headers: headers
            })
            const paramUrls = new URLSearchParams(params).toString();
            const url = (this.baseUrl + endpoint + paramUrls).trim();
            const options: IRequestOptions = {
                ...newOptions,
                method: 'GET',
            }
            return fetch(url, options);
        } catch (error) {
            throw error
        }

    }
    async post<T>(endpoint: string, body: any = {}): Promise<IResponse<T>> {
        try {
            const headers = await this.appendHeader();
            const newOptions = Object.assign({}, this.options, {
                headers: headers
            })

            const url = (this.baseUrl + endpoint).trim();
            const options: IRequestOptions = {
                ...newOptions,
                method: 'POST',
                body: JSON.stringify(body)
            }

            return fetch(url, options);
        } catch (error) {
            throw error
        }

    }
    async put<T>(endpoint: string, body: any = {}): Promise<IResponse<T>> {
        try {
            const headers = await this.appendHeader();
            const newOptions = Object.assign({}, this.options, {
                headers: headers
            })

            const url = (this.baseUrl + endpoint).trim();
            const options: IRequestOptions = {
                ...newOptions,
                method: 'PUT',
                body: JSON.stringify(body)
            }
            return fetch(url, options);
        } catch (error) {
            throw error
        }

    }
    async patch<T>(endpoint: string, body: any = {}): Promise<IResponse<T>> {
        try {
            const headers = await this.appendHeader();
            const newOptions = Object.assign({}, this.options, {
                headers: headers
            })

            const url = (this.baseUrl + endpoint).trim();
            const options: IRequestOptions = {
                ...newOptions,
                method: 'PATCH',
                body: JSON.stringify(body)
            }
            return fetch(url, options);
        } catch (error) {
            throw error
        }

    }
    async delete<T>(endpoint: string, body: any = {}): Promise<IResponse<T>> {
        try {
            const headers = await this.appendHeader();
            const newOptions = Object.assign({}, this.options, {
                headers: headers
            })

            const url = (this.baseUrl + endpoint).trim();
            const options: IRequestOptions = {
                ...newOptions,
                method: "DELETE",
                body: JSON.stringify(body)
            }
            return fetch(url, options);
        } catch (error) {
            throw error
        }

    }
}

