import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CoreResponse } from '../core/interfaces/coreResponse.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { CoreTransformInterceptor } from '../core/interceptors/coreTransform.interceptor';
import { DefaultListQuery } from '../core/decorators/defaultListQuery.decorator';

@ApiTags('User')
@Controller('users')
@UseInterceptors(CoreTransformInterceptor)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('/')
  @DefaultListQuery()
  async getList(@Query() query: any): Promise<CoreResponse> {
    const { users, total } = await this.UserService.getList(query);
    const data = {
      items: users,
      total,
    };
    return { data };
  }

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<CoreResponse> {
    const result = await this.UserService.create(createUserDto);
    return { data: result };
  }
}
