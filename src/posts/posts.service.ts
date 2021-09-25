import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

// mongoose
import { Model, Types as mongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BlogPost,
  BlogPost as BlogPostModel,
  BlogPostDocument,
} from './schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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
      imageUrl: imageUrl ? imageUrl : defaultImageUrl,
      author: currentUser._id,
    });

    const createdBlogPost = await newBlogPost.save();

    currentUser.blogPosts.push(createdBlogPost);
    await currentUser.save();

    return createdBlogPost;
  }

  async updatePost(
    updatePost: UpdatePostDto,
    userId: string,
  ): Promise<BlogPostDocument> {
    try {
      // check if the blog post even exsists
      const oldBlogPost = await this.blogPostModel.findById(updatePost._id);
      if (!oldBlogPost)
        throw new BadRequestException('Original BlogPost does not exsist.');

      // check if the blog post belongs to the current user
      if (!(await this.userOwnsPost(oldBlogPost._id, userId)))
        throw new UnauthorizedException('User does not own BlogPost');

      return this.blogPostModel
        .findByIdAndUpdate(updatePost._id, updatePost, { new: true }) // new: true returns the updated blog
        .exec();
    } catch (error) {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(error);
      else if (error instanceof NotFoundException)
        throw new NotFoundException(error);
      else throw new BadRequestException(error);
    }
  }

  async deletePostById(postId: string, userId: string): Promise<BlogPostModel> {
    try {
      // check if the post exsists
      const currentPost = await this.blogPostModel.findById(postId);
      if (!currentPost) throw new NotFoundException();

      // check if the post belongs to the user
      if (!(await this.userOwnsPost(currentPost._id, userId)))
        throw new UnauthorizedException('User does not own BlogPost'); // throws error if the user doesn't own

      // delete the post from the user's list and save user
      const currentUser = await this.userModel.findById(userId);
      currentUser.blogPosts = currentUser.blogPosts.filter(
        (e) => String(e) != currentPost._id,
      );
      await currentUser.save();

      // delete the post from the database

      return await currentPost.remove();
    } catch (error) {
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(error);
      else if (error instanceof NotFoundException)
        throw new NotFoundException(error);
      else throw new BadRequestException(error);
    }
  }

  async userOwnsPost(postId: string, userId: string): Promise<boolean> {
    const blogPost = await this.blogPostModel.findById(postId);
    return String(blogPost.author) == userId;
  }

  async likePost(postId: string, userId: string): Promise<BlogPostModel> {
    // check if postID is valid
    if (!mongooseTypes.ObjectId.isValid(postId))
      throw new BadRequestException('Post ID is not valid.');

    // find the blog post and extract all of the likes (which are user IDs)
    const foundPost = await this.blogPostModel.findById(postId);

    // check if the post even exsists
    if (!foundPost) throw new NotFoundException('Post does not exsist');

    // find the user by ID
    const foundUser = await this.userModel.findById(userId);

    // make sure that the userID is not in the blog post likes
    if (foundPost.usersLiked.includes(foundUser._id))
      throw new ForbiddenException('User has already liked post');

    // add userID to the post likes
    foundPost.usersLiked.push(foundUser._id);

    // add post to the user likes
    foundUser.likedBlogPosts.push(foundPost._id);

    // save both
    await foundPost.save();
    await foundUser.save();

    // return post
    return foundPost; // change this
  }

  async unlikePost(postId: string, userId: string): Promise<BlogPostModel> {
    // check if the post id is valid
    if (!mongooseTypes.ObjectId.isValid(postId))
      throw new BadRequestException('Post ID is not valid.');

    // find the post by its id
    const foundPost = await this.blogPostModel.findById(postId);

    // find the user by its id
    const foundUser = await this.userModel.findById(userId);

    // make sure that user exsists on the post's user liked list
    if (!foundPost.usersLiked.includes(foundUser._id))
      throw new ForbiddenException('User has not already liked the blog post.');

    // remove user id from that list
    foundPost.usersLiked = foundPost.usersLiked.filter(
      (e) => e != foundUser._id,
    );

    // remove postID from the user's liked list
    foundUser.likedBlogPosts = foundUser.likedBlogPosts.filter(
      (e) => e != foundUser._id,
    );

    // save both
    await foundPost.save();
    await foundUser.save();

    // return updated post
    return foundPost;
  }
}
