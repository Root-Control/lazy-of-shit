import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './blogPost.schema';
import { BlogPostsController } from './blogPosts.controller';
import { BlogPostsService } from './blogPosts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
  ],
  controllers: [BlogPostsController],
  providers: [
    BlogPostsService
  ],
  exports: [BlogPostsService],
})
export class BlogPostsModule {}