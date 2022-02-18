import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Visible } from '../../core/constants/post.comstant';
export class CreatePostDto {
  @ApiProperty({ description: 'User id', required: true })
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: `Post's content`, required: true })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: `Post's images` })
  @IsOptional()
  images: [];

  @ApiProperty({ description: 'Visible' })
  @IsOptional()
  visible: Visible;
}
