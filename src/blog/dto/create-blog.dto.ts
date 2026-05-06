import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog title', example: 'My First Blog' })
  title!: string;

  @ApiProperty({ description: 'Blog content', example: 'This is the content of my blog.' })
  content!: string;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  author!: string;
}