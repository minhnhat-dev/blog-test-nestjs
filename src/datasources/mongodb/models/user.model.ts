import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({
    trim: true,
  })
  fullName: string;

  @Prop({
    trim: true,
    required: true,
  })
  username: string;

  @Prop({
    trim: true,
    required: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
