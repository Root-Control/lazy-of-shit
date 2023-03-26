import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { CrudService } from 'src/@generics/crud.service';
import { Article, ArticleDocument } from './article.schema';
import { ArticleDto } from './dtos/article.dto';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ArticlesService extends CrudService<
    ArticleDocument,
    ArticleDto,
    CreateArticleDto,
    UpdateArticleDto
> {
    articleModel: Model<ArticleDocument>;

    constructor(@InjectModel(Article.name) private readonly _articleModel: Model<ArticleDocument>) {
        super(_articleModel, ArticleDto);
        this.articleModel = _articleModel;
    }
}