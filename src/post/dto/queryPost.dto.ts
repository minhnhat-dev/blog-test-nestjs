import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryPostDto {
  @ApiProperty({
    description: `Text search for content`,
    required: false,
    example: 'Blog content',
  })
  @IsOptional()
  searchText: string;
}
