import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { DataSourcesModule } from '../datasources/datasources.module';
import { PostValidator } from './validators/post.validator';
import { CommentService } from '../comment/comment.service';
import { CommentValidator } from '../comment/validators/comment.validator';

@Module({
  imports: [DataSourcesModule],
  controllers: [PostController],
  providers: [
    PostService,
    UserService,
    PostValidator,
    CommentService,
    CommentValidator,
  ],
})
export class PostModule {}
