import HttpException from './HttpException';

export default class BadRequestException extends HttpException {
    constructor(cause?: HttpException, message: string = 'Bad request!', status: number = 400) {
        super(cause, message, status);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
