import { ApiProperty } from '@nestjs/swagger';

export class BlogPost {
  @ApiProperty()
  id: number;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  likeCounter: number;
}
