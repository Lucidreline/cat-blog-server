import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './schemas/post.schema';
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
  @ApiInternalServerErrorResponse() // if the id is not the correct format
  @ApiNotFoundResponse() // if the id does not belong to a user
  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<BlogPost> {
    const post = await this.postsService.findById(id);

    if (!post) throw new NotFoundException();

    return post;
  }

  @ApiCreatedResponse({ type: BlogPost })
  @ApiBadRequestResponse() // its possible to get a bad responce because we added validation in the dto
  @Post()
  createPost(@Body() body: CreateTaskDto): Promise<BlogPost> {
    return this.postsService.createPost(body);
  }
}
