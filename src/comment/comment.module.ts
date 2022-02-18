import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserService } from '../user/user.service';
import { DataSourcesModule } from '../datasources/datasources.module';

@Module({
  imports: [DataSourcesModule],
  controllers: [],
  providers: [CommentService, UserService],
})
export class CommentModule {}
