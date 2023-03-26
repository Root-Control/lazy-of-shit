import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/@base/base.entity';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  age: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);