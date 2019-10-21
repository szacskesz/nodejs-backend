import HttpException from './../../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';
import logger from './../logger/Logger';

const errorHandlerMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    logger.error(error.toString());

    response.status(status).send({message})
}

export default errorHandlerMiddleware;
