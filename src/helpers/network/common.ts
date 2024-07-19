export class ApiException<T = any> {
    public status?: number;
    public message?: string;
    public data?: T

    constructor(message = '', status = 500, data: T = undefined) {
        this.status = status;
        this.message = message;
        this.data = data
    }
}

