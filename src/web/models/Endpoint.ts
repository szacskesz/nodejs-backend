import { Request, Response, NextFunction } from 'express';

export default class Endpoint {
    method: HttpMethod
    path: string;
    handlerFunction: (request: Request, response: Response, next?: NextFunction) => void;

    constructor(
        method: HttpMethod,
        path: string,
        handlerFunction: ((request: Request, response: Response, next?: NextFunction) => void)
    ) {
        this.path = path;
        this.method = method;
        this.handlerFunction = handlerFunction;
    }
}