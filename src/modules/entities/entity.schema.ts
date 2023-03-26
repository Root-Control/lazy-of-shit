import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/@base/base.entity';

export type EntityDocument = Entity & Document;

@Schema({ timestamps: true })
export class Entity extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  age: number;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);