import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/post.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
