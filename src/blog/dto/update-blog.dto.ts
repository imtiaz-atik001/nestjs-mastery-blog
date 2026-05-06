import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiPropertyOptional({ description: 'Blog title', example: 'Updated Title' })
  title?: string;

  @ApiPropertyOptional({ description: 'Blog content', example: 'Updated content.' })
  content?: string;

  @ApiPropertyOptional({ description: 'Author name', example: 'Jane Doe' })
  author?: string;
}