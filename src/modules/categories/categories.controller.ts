import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { Category } from './category.schema';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos/category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ type: [CategoryDto] })
  async findAll(@Query() query: FilterQuery<Category>) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: string) {
    const category = await this.categoryService.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  @Post()
  @ApiOkResponse({ type: CategoryDto })
  @ApiBadRequestResponse()
  async create(@Body() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoryDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
    const category = await this.categoryService.update(id, updateDto);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const category = await this.categoryService.delete(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return;
  }
}
