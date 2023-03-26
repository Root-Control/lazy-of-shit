import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEntityDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly age: number;
}