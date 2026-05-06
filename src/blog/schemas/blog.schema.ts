import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @ApiProperty({ description: 'Unique identifier', example: '64b8f0c2e1d2c3a4b5c6d7e' })
  _id!: string;

  @ApiProperty({ description: 'Blog title', example: 'My First Blog' })
  @Prop({ required: true })
  title!: string;

  @ApiProperty({ description: 'Blog content', example: 'This is my blog content.' })
  @Prop({ required: true })
  content!: string;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  @Prop({ required: true })
  author!: string;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-15T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-15T10:00:00.000Z' })
  updatedAt!: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);