import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
  @ApiNotFoundResponse()
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): BlogPost {
    const post = this.postsService.findById(id);

    if (!post) throw new NotFoundException();

    return post;
  }

  @ApiCreatedResponse({ type: BlogPost })
  @ApiBadRequestResponse() // its possible to get a bad responce because we added validation in the dto
  @Post()
  createPost(@Body() body: CreateTaskDto): BlogPost {
    return this.postsService.createPost(body);
  }
}
