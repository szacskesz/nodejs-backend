import Exception from "./Exception";

export default class HttpException extends Exception {
    status: number;

    constructor(cause?: HttpException['cause'], message?: HttpException['message'], status: HttpException['status'] = 500) {
        super(cause, message);

        this.status = status;

        this.name = this.constructor.name;;
    }
}

