import { PartialType } from '@nestjs/swagger';
import { CreateBlogPostDto } from './create-blogPost.dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
