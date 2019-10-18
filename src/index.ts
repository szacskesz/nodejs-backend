import "reflect-metadata";
import Server from  './web/server/Server';

// It's the 'main' function.
console.info('Starting up the server.');
const server = new Server();

server.start();
