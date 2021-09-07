import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOkResponse({ type: BlogPost, isArray: true })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  getPosts(@Query('search') query: string): BlogPost[] {
    return this.postsService.findAll(query);
  }

  @ApiOkResponse({ type: BlogPost })
  @Get(':id')
  getPostById(@Param('id') id: string): BlogPost {
    // TODO: have nest do auto parsing
    return this.postsService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: BlogPost })
  @Post()
  createPost(@Body() body: CreateTaskDto): BlogPost {
    return this.postsService.createPost(body);
  }
}
