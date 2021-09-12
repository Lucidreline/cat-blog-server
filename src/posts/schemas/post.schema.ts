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

  @Prop({ required: true })
  likeCounter: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: User;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
