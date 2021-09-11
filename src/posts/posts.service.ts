import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

// mongoose
import { Model, Types as mongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BlogPost as BlogPostModel,
  BlogPostDocument,
} from './schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(BlogPostModel.name)
    private blogPostModel: Model<BlogPostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

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

  findById(postId: string): Promise<BlogPostModel> {
    if (!mongooseTypes.ObjectId.isValid(postId))
      throw new BadRequestException();
    return this.blogPostModel.findById(postId).exec();
  }

  async createPost(
    post: CreatePostDto,
    userId: string,
  ): Promise<BlogPostModel> {
    const { imageUrl } = post;

    const defaultImageUrl =
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80';

    const currentUser = await this.userModel.findById(userId);

    const newBlogPost = new this.blogPostModel({
      ...post,
      likeCounter: 0,
      imageUrl: imageUrl ? imageUrl : defaultImageUrl,
      authorId: currentUser._id,
      authorUsername: currentUser.username,
    });

    const createdBlogPost = await newBlogPost.save();

    currentUser.blogPosts.push(createdBlogPost._id);
    await currentUser.save();

    return createdBlogPost;
  }

  updatePost(updatePost: UpdatePostDto): Promise<BlogPostDocument> {
    return this.blogPostModel
      .findByIdAndUpdate(updatePost._id, updatePost, { new: true }) // new: true returns the updated blog
      .exec();
  }

  deletePostById(postId: string): Promise<BlogPostModel> {
    return this.blogPostModel.findByIdAndDelete(postId).exec();
  }
}
