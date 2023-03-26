import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { CrudService } from 'src/@generics/crud.service';
import { Category, CategoryDocument } from './category.schema';
import { CategoryDto } from './dtos/category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class CategoriesService extends CrudService<
    CategoryDocument,
    CategoryDto,
    CreateCategoryDto,
    UpdateCategoryDto
> {
    categoryModel: Model<CategoryDocument>;

    constructor(@InjectModel(Category.name) private readonly _categoryModel: Model<CategoryDocument>) {
        super(_categoryModel, CategoryDto);
        this.categoryModel = _categoryModel;
    }
}