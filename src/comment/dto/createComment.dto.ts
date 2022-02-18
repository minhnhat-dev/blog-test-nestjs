import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateCommentDto {
  @ApiProperty({ description: 'User comment', required: true })
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: `Comment's content`, required: true })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: `Post's id` })
  @IsOptional()
  post: string;
}
