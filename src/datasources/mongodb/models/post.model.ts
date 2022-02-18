import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Visible } from '../../../core/constants/post.comstant';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Post extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    default: null,
    required: true,
    ref: 'User',
  })
  user;

  @Prop({
    required: true,
    trim: true,
  })
  content: string;

  @Prop()
  images: [];

  @Prop({
    default: 0,
  })
  totalLikes: number;

  @Prop({
    default: 0,
  })
  totalComments: number;

  @Prop({
    default: Visible.PUBLIC,
  })
  visible: Visible;
}

export const PostSchema = SchemaFactory.createForClass(Post);
