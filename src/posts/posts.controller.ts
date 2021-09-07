import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @ApiCreatedResponse({ type: [BlogPost] })
  @Get()
  getPosts(): BlogPost[] {
    return this.postsService.findAll();
  }

  @ApiCreatedResponse({ type: BlogPost })
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
