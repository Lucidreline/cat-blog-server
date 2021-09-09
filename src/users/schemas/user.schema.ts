import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BlogPost } from 'src/posts/schemas/post.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }] })
  blogPosts: BlogPost[];
}

export const UserSchema = SchemaFactory.createForClass(User);
