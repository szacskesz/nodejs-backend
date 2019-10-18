import { Request, Response, NextFunction } from 'express';
import Controller from '../models/Controller';
import Endpoint from '../models/Endpoint';
import ItemService from '../../service/services/ItemService';
import { ItemDto, CreateItemDto } from '../../data/models/Item';

export default class ItemController implements Controller {
    prefix: string;
    endpoints: Endpoint[];
    itemService: ItemService;

    constructor(itemService?: ItemService) {
        this.prefix = '/item';
        this.itemService = itemService ? itemService : new ItemService();
        this.endpoints = [
            new Endpoint(HttpMethod.GET, '/getAllItems', this.getAllItems),
            new Endpoint(HttpMethod.POST, '/createItem', this.createItem)
        ];
    }

    private getAllItems = async (request: Request, response: Response, next: NextFunction) => {
        try {
            let items: ItemDto[] = await this.itemService.getAllItems();

            response.status(200).send(items);
        } catch (e) {
            next(e);
        }

    }

    private createItem = async (request: Request, response: Response, next: NextFunction) => {
        try {
            let createItemDto: CreateItemDto = CreateItemDto.parse(request.body);
            await this.itemService.createItem(createItemDto)

            response.status(200).send();
        } catch (e) {
            next(e);
        }
    }
}