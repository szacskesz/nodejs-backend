import config from 'config';
import express, { Application } from  'express';
import bodyParser from 'body-parser';
import Controller from '../models/Controller';
import ItemController from '../controllers/ItemController';
import urljoin from 'url-join';
import DatabaseConnection from '../database-connection/DatabaseConnection';
import errorHandlerMiddleware from './../middlewares/ErrorHandlerMiddleware';
import logger from './../logger/Logger';

interface ServerOptions {
    port: number;
    prefix: string;
}

export default class Server {
    private app: Application;
    private options: ServerOptions;
    private controllers: Controller[];

    constructor(controllers?: Controller[]) {
        this.app = express();
        this.options = {
            port: config.get('server.port'),
            prefix: config.get('server.prefix')
        };
        this.controllers = controllers ? controllers : [];

        this.configureMiddlewares();
        if (controllers == null) {
            this.createControllers();
        }
        this.applyControllers();
        this.initializeErrorHandling();
    }

    public start = () => {
        DatabaseConnection.connectToDatabase().then(()=> {
            this.app.listen(this.options.port, () => {
                logger.info(`Server is started on port ${this.options.port}.`);
            });
        })
    }

    private configureMiddlewares = () => {
        this.app.use(bodyParser.json());
    }

    private initializeErrorHandling() {
        this.app.use(errorHandlerMiddleware);
    }

    private createControllers = () => {
        this.controllers = [
            new ItemController()
        ];
    }

    private applyControllers = () => {
        this.controllers.forEach(c => {
            c.endpoints.forEach(e => {
                const p = urljoin(this.options.prefix, c.prefix, e.path);
                const f = e.handlerFunction;

                switch(e.method) {
                    case HttpMethod.GET: {
                        this.app.get(p, f);
                    }
                    case HttpMethod.POST: {
                        this.app.post(p, f);
                    }
                    case HttpMethod.PUT: {
                        this.app.put(p, f);
                    }
                    case HttpMethod.DELETE: {
                        this.app.delete(p, f);
                    }
                }
            })
        })
    }
}
