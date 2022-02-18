import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataSourcesModule } from '../datasources/datasources.module';

@Module({
  imports: [DataSourcesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
