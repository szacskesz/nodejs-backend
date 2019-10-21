import "reflect-metadata";
import Server from  './web/server/Server';
import logger from './web/logger/Logger';

// It's the 'main' function.
logger.info('Starting up the server.');
const server = new Server();

server.start();
