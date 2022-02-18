import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryCommentDto {
  @ApiProperty({
    description: `Text search for content`,
    required: false,
    example: 'Blog content',
  })
  @IsOptional()
  searchText: string;

  @ApiProperty({
    description: `Post id`,
    required: true,
  })
  @IsOptional()
  post: string;
}
