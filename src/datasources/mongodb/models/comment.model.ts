import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Comment extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    default: null,
    ref: 'Post',
  })
  post;

  @Prop({
    type: SchemaTypes.ObjectId,
    default: null,
    ref: 'User',
  })
  user;

  @Prop({
    trim: true,
  })
  content: string;

  @Prop()
  totalLikes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
