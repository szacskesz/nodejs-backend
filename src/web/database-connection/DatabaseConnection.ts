import config from 'config';
import { MongoClient, MongoClientOptions, Db } from "mongodb";
import NoDatabaseConnectionException from '../../exceptions/NoActiveDatabaseConnectionException';

const MONGO_URL: string = config.get('db.url');
const MONGO_OPTIONS: MongoClientOptions = {
    useNewUrlParser: true, 
    autoReconnect: true,
    useUnifiedTopology: true,
    auth: {
        user: config.get('db.username'),
        password: config.get('db.password')
    }
};

export default class DatabaseConnection {
    private static dbConnection: Db;
    private static connectingPromise?: Promise<void>;

    private constructor() {}

    public static connectToDatabase = (): Promise<void> => {
        if (DatabaseConnection.connectingPromise == null) {
            DatabaseConnection.connectingPromise = MongoClient.connect(MONGO_URL, MONGO_OPTIONS)
            .then((client) => {
                DatabaseConnection.dbConnection = client.db();
                DatabaseConnection.connectingPromise = undefined;
    
                console.info('Successfully connected to the database!');
            }).catch((error) => {
                DatabaseConnection.connectingPromise = undefined;

                console.error('Could not connect to the database!');
                throw error;
            })
        }
        
        return DatabaseConnection.connectingPromise
    }

    public static getDatabaseConnection = (): Db => {
        if (DatabaseConnection.dbConnection == null) {
            throw new NoDatabaseConnectionException();
        } else {
            return DatabaseConnection.dbConnection;
        }

    }
}