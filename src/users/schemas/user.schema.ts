import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BlogPost } from 'src/posts/schemas/post.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: [],
  })
  blogPosts: BlogPost[];

  @Prop({
    default: [],
  })
  likedBlogPosts: BlogPost[];
}

export const UserSchema = SchemaFactory.createForClass(User);
