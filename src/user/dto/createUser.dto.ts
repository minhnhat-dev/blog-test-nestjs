import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: `User's fullName` })
  @IsOptional()
  fullName: string;

  @ApiProperty({ description: `User's username`, required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: `User's email`, required: true })
  @IsNotEmpty()
  email: string;
}
