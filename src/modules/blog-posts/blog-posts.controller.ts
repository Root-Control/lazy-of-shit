import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';
import { BlogPost } from './blogPost.schema';
import { BlogPostsService } from './blogPosts.service';
import { BlogPostDto } from './dtos/blogPost.dto';
import { CreateBlogPostDto } from './dtos/create-blogPost.dto';
import { UpdateBlogPostDto } from './dtos/update-blogPost.dto';

@ApiTags('BlogPosts')
@Controller('blogPosts')
export class BlogPostsController {
  constructor(private readonly blogPostService: BlogPostsService) {}

  @Get()
  @ApiOkResponse({ type: [BlogPostDto] })
  async findAll(@Query() query: FilterQuery<BlogPost>) {
    return this.blogPostService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: BlogPostDto })
  @ApiNotFoundResponse()
  async findById(@Param('id') id: string) {
    const blogPost = await this.blogPostService.findById(id);
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with id ${id} not found`);
    }
    return blogPost;
  }

  @Post()
  @ApiOkResponse({ type: BlogPostDto })
  @ApiBadRequestResponse()
  async create(@Body() createDto: CreateBlogPostDto) {
    return this.blogPostService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BlogPostDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateDto: UpdateBlogPostDto) {
    const blogPost = await this.blogPostService.update(id, updateDto);
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with id ${id} not found`);
    }
    return blogPost;
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string) {
    const blogPost = await this.blogPostService.delete(id);
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with id ${id} not found`);
    }
    return;
  }
}
