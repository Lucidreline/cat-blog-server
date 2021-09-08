import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './entities/blog-post.entity';

// mongoose
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BlogPost as BlogPostModel,
  BlogPostDocument,
} from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(BlogPostModel.name)
    private blogPostModel: Model<BlogPostDocument>,
  ) {}

  private posts: BlogPost[] = [
    {
      id: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Denor',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 1,
    },
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Ipsum Dolor Sit',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 5,
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Sit',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 3,
    },
  ];

  async findAll(query?: string): Promise<BlogPostModel[]> {
    const allBlogPosts = await this.blogPostModel.find();

    if (query)
      return allBlogPosts.filter(
        (blogPost) =>
          blogPost.textBody.toLowerCase().includes(query.toLowerCase()) ||
          blogPost.title.toLowerCase().includes(query.toLowerCase()),
      );

    return allBlogPosts;
  }

  findById(postId: number): BlogPost {
    return this.posts.find((post) => post.id === postId);
  }

  createPost(post: CreateTaskDto): Promise<BlogPostModel> {
    const { imageUrl } = post;

    const defaultImageUrl =
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80';
    const newBlogPost = new this.blogPostModel({
      ...post,
      likeCounter: 0,
      imageUrl: imageUrl ? imageUrl : defaultImageUrl,
    });

    return newBlogPost.save();
  }
}
