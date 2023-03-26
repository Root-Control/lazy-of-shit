import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CategoryDto {
  @ApiProperty()
  @Transform((value) => value.obj._id.toString())
  readonly _id: ObjectId;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;

  @ApiProperty()
  @IsString()
  @Expose()
  @Transform((value) => `${value.obj.title} ${value.obj.content}`)
  readonly titleAndContent: string;

  constructor(partial: Partial<CategoryDto>) {
    Object.assign(this, partial);
  }
}