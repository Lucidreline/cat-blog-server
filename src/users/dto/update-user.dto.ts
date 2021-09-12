import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from 'src/posts/schemas/post.schema';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  blogPosts: BlogPost[];

  @ApiProperty()
  likedBlogPosts: BlogPost[];
}
