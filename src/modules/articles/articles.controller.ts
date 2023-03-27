import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { Article } from './article.schema';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dtos/article.dto';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOkResponse({ type: [ArticleDto] })
  async findAll(@Query() query: FilterQuery<Article>) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: string) {
    const article = await this.articlesService.findById(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  @Post()
  @ApiOkResponse({ type: ArticleDto })
  @ApiBadRequestResponse()
  async create(@Body() createDto: CreateArticleDto) {
    return this.articlesService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateDto: UpdateArticleDto) {
    const article = await this.articlesService.update(id, updateDto);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const article = await this.articlesService.delete(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return;
  }
}
