
import ItemDao from './../../data/daos/ItemDao';
import { CreateItemDto } from '../../data/models/Item';
import ServiceException from './../../exceptions/ServiceException';

export default class ItemService {
    private itemDao: ItemDao;

    constructor(itemDao?: ItemDao) {
        this.itemDao = itemDao ? itemDao : new ItemDao();
    }

    public createItem = async (item: CreateItemDto) => {
        try {
            return await this.itemDao.createItem(item);
        } catch (e) {
            throw new ServiceException(e);
        }
    }

    public getAllItems = async () => {
        try {
            return await this.itemDao.getAllItems();
        } catch (e) {
            throw new ServiceException(e);
        }
    }
}
