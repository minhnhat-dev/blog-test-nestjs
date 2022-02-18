import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Restaurant, RestaurantSchema } from './models/restaurant.model';
import { Category, CategorySchema } from './models/category.model';
import { Post, PostSchema } from './models/post.model';
import { Comment, CommentSchema } from './models/comment.model';
import { User, UserSchema } from './models/user.model';
import { optionalRequire } from '@nestjs/core/helpers/optional-require';

const modelSchemas = [
  MongooseModule.forFeature([
    { name: Restaurant.name, schema: RestaurantSchema },
  ]),
  MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];
// console.log('process.env', process.env);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        console.log('process.env.DB_URL', process.env.DB_URL);

        return {
          uri: process.env.DB_URL,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectionFactory: (connection: Record<any, any>): any => {
            connection.plugin(optionalRequire('mongoose-paginate-v2'));
            return connection;
          },
        };
      },
    }),
    ...modelSchemas,
  ],
  exports: [...modelSchemas],
})
export class MongodbModule {}
