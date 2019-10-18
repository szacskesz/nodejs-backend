export default class Exception extends Error {
    cause?: Exception | Error;

    constructor(cause?: Exception['cause'], message?: Exception['message']) {
        super(message);

        this.cause = cause;

        this.name = this.constructor.name;
    }

    public toString(): string {
        if (this.cause != null) {
            let string: string = '';
            string += this.name + ": " + this.message;
            string += '\n  caused by: ';

            (this.cause instanceof Exception)
                ? string += this.cause.toString()
                : string += this.cause.stack

            return string;
        } else {
            return this.stack;
        }
    }
}
