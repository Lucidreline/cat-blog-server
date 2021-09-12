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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
    required: true,
    default: [],
  })
  blogPosts: BlogPost[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
    required: true,
    default: [],
  })
  likedBlogPosts: BlogPost[];
}

export const UserSchema = SchemaFactory.createForClass(User);
