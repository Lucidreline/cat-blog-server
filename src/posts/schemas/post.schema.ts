import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

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
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
