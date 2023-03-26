import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { Entity } from './entity.schema';
import { EntitiesService } from './entities.service';
import { EntityDto } from './dtos/entity.dto';
import { CreateEntityDto } from './dtos/create-entity.dto';
import { UpdateEntityDto } from './dtos/update-entity.dto';

@ApiTags('Entities')
@Controller('entities')
export class EntitiesController {
  constructor(private readonly entityService: EntitiesService) {}

  @Get()
  @ApiOkResponse({ type: [EntityDto] })
  async findAll(@Query() query: FilterQuery<Entity>) {
    return this.entityService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: EntityDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: string) {
    const entity = await this.entityService.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  @Post()
  @ApiOkResponse({ type: EntityDto })
  @ApiBadRequestResponse()
  async create(@Body() createDto: CreateEntityDto) {
    return this.entityService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EntityDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateDto: UpdateEntityDto) {
    const entity = await this.entityService.update(id, updateDto);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const entity = await this.entityService.delete(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return;
  }
}
