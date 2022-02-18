import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdateCommentDto {
  @ApiProperty({ description: `Comment's content`, required: true })
  @IsOptional()
  content: string;
}
