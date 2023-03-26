import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';
import { CrudService } from 'src/@generics/crud.service';
import { BlogPost, BlogPostDocument } from './blogPost.schema';
import { BlogPostDto } from './dtos/blogPost.dto';
import { CreateBlogPostDto } from './dtos/create-blogPost.dto';
import { UpdateBlogPostDto } from './dtos/update-blogPost.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class BlogPostsService extends CrudService<
    BlogPostDocument,
    BlogPostDto,
    CreateBlogPostDto,
    UpdateBlogPostDto
> {
    blogPostModel: Model<BlogPostDocument>;

    constructor(@InjectModel(BlogPost.name) private readonly _blogPostModel: Model<BlogPostDocument>) {
        super(_blogPostModel, BlogPostDto);
        this.blogPostModel = _blogPostModel;
    }
}