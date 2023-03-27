import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { Product } from './product.schema';
import { ProductsService } from './products.service';
import { ProductDto } from './dtos/product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: [ProductDto] })
  async findAll(@Query() query: FilterQuery<Product>) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Post()
  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse()
  async create(@Body() createDto: CreateProductDto) {
    return this.productsService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    const product = await this.productsService.update(id, updateDto);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const product = await this.productsService.delete(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return;
  }
}
