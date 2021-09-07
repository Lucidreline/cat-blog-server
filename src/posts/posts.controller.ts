import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  getPosts(): any {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPostById(@Param('id') id: string): any {
    // TODO: have nest do auto parsing
    return this.postsService.findById(Number(id));
  }
}
