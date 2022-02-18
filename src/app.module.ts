import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoresModule } from './core/cores.module';
import { DataSourcesModule } from './datasources/datasources.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    CoresModule,
    DataSourcesModule,
    PostModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
