import config from 'config';
import winston from 'winston';
import path from 'path';

const myFormat = winston.format.printf((info) => {
    return `[${info.timestamp}] [${info.level}]: ${info.message}`;
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                myFormat,
            ),
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: path.normalize(config.get('logger.file.path')),
            level: config.get('logger.level'),
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                myFormat,
            ),
            handleExceptions: true
        }),
    ],
    exitOnError: false,
});
 
export default logger;
