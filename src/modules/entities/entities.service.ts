import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { CrudService } from 'src/@generics/crud.service';
import { Entity, EntityDocument } from './entity.schema';
import { EntityDto } from './dtos/entity.dto';
import { CreateEntityDto } from './dtos/create-entity.dto';
import { UpdateEntityDto } from './dtos/update-entity.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class EntitiesService extends CrudService<
    EntityDocument,
    EntityDto,
    CreateEntityDto,
    UpdateEntityDto
> {
    entityModel: Model<EntityDocument>;

    constructor(@InjectModel(Entity.name) private readonly _entityModel: Model<EntityDocument>) {
        super(_entityModel, EntityDto);
        this.entityModel = _entityModel;
    }
}