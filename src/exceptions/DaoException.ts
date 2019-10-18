import HttpException from './HttpException';
import Exception from './Exception';

export default class DaoException extends HttpException {

    constructor(cause?: Exception | HttpException, message?: string, status?: number) {
        const _status = status != null
            ? status
            : cause && cause instanceof HttpException
                ? cause.status
                : undefined;

        super(cause, message, _status);

        this.name = this.constructor.name;
    }
}
