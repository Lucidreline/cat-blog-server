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
import { BlogPost as BlogPostModel } from './schemas/post.schema';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOkResponse({ type: BlogPost, isArray: true })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async getPosts(@Query('search') query: string) {
    if (query) return await this.postsService.findAll(query);

    return await this.postsService.findAll();
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
  createPost(@Body() body: CreateTaskDto): Promise<BlogPostModel> {
    return this.postsService.createPost(body);
  }
}
