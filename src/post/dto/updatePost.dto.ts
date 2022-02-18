import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Visible } from '../../core/constants/post.comstant';

export class UpdatePostDto {
  @ApiProperty({ description: `Post's content`, required: true })
  @IsOptional()
  content: string;

  @ApiProperty({ description: `Post's images` })
  @IsOptional()
  images: [];

  @ApiProperty({ description: 'Visible' })
  @IsOptional()
  visible: Visible;
}
