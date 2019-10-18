import HttpException from './HttpException';

export default class NoActiveDatabaseConnectionException extends HttpException {
    constructor(cause?: HttpException, message: string = 'No active database connection', status: number = 500) {
        super(cause, message, status);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
