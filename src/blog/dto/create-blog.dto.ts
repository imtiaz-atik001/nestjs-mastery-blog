import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog title', example: 'My First Blog' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @ApiProperty({ description: 'Blog content', example: 'This is my blog content.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  content!: string;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  author!: string;
}