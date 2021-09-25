import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type BlogPostDocument = BlogPost & mongoose.Document;

@Schema()
export class BlogPost {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  textBody: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: User;

  @Prop()
  authorUsername: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
    required: true,
    default: [],
  })
  usersLiked: User[];
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
