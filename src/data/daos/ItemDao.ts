import { ItemDto, CreateItemDto } from '../../data/models/Item';
import DatabaseConnection from './../../web/database-connection/DatabaseConnection';
import DaoException from './../../exceptions/DaoException';

const COLLECTION_NAME = 'item';

export default class ItemDao {
    constructor() { }

    public createItem = (item: CreateItemDto): Promise<void> => {
        const db = DatabaseConnection.getDatabaseConnection();
        const collection = db.collection<ItemDto>(COLLECTION_NAME);

        return collection.insertOne(item)
            .catch((e) => {
                throw new DaoException(e, 'Item cannot be created', 500);
            })
            .then((response) => {
                if (response.insertedCount !== 1) {
                    throw new DaoException(undefined, 'Item cannot be created', 500);
                }

                return;
            });
    }

    public getAllItems = (): Promise<ItemDto[]> => {
        const db = DatabaseConnection.getDatabaseConnection();
        const collection = db.collection<ItemDto>(COLLECTION_NAME);

        return collection.find().toArray()
            .catch((e) => {
                throw new DaoException(undefined, 'Items cannot be recieved', 500);
            })
            .then((items) => {
                return items;
            });
    }
}