import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { CrudService } from 'src/@generics/crud.service';
import { Product, ProductDocument } from './product.schema';
import { ProductDto } from './dtos/product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ProductsService extends CrudService<
    ProductDocument,
    ProductDto,
    CreateProductDto,
    UpdateProductDto
> {
    productModel: Model<ProductDocument>;

    constructor(@InjectModel(Product.name) private readonly _productModel: Model<ProductDocument>) {
        super(_productModel, ProductDto);
        this.productModel = _productModel;
    }
}