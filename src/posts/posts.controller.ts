import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  getPosts(): BlogPost[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): BlogPost {
    // TODO: have nest do auto parsing
    return this.postsService.findById(Number(id));
  }

  @Post()
  createPost(@Body() body: CreateTaskDto): BlogPost {
    return this.postsService.createPost(body);
  }
}
