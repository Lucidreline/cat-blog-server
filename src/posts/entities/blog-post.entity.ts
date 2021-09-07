import { ApiProperty } from '@nestjs/swagger';

export class BlogPost {
  @ApiProperty()
  id: number;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  textBody: string;
  @ApiProperty()
  likeCounter: number;
}
