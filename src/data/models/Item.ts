import { ObjectID } from 'mongodb';
import { IsInt, IsDefined, IsPositive, MaxLength, IsNotEmpty, IsInstance, validateSync, ValidatorOptions } from "class-validator";
import { Type, Transform, plainToClass } from 'class-transformer';
import BadRequestException from '../../exceptions/BadRequestException';

const VALIDATOR_OPTIONS: ValidatorOptions = {
    skipUndefinedProperties: false,
    skipNullProperties: false,
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
};

export const convertStringToObjectID = (value) => {
    try {
        return new ObjectID(value);
    } catch (e) {
        return undefined;
    }
}

export class CreateItemDto {

    @IsDefined()
    @IsNotEmpty()
    @MaxLength(20)
    @Type(() => String)
    name: string;

    @IsDefined()
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    count: number;

    public static parse = (obj: any): CreateItemDto => {
        let dto: CreateItemDto = plainToClass(CreateItemDto, obj)
        let errors = validateSync(dto, VALIDATOR_OPTIONS);

        if (errors.length > 0) {
            throw new BadRequestException();
        }

        return dto;
    }
}

export class ItemDto extends CreateItemDto {

    @IsDefined()
    @IsInstance(ObjectID)
    @Transform(convertStringToObjectID)
    _id: ObjectID

    public static parse = (obj: any): ItemDto => {
        let dto: ItemDto = plainToClass(ItemDto, obj)
        let errors = validateSync(dto, VALIDATOR_OPTIONS);

        if (errors.length > 0) {
            throw new BadRequestException();
        }

        return dto;
    }
}


