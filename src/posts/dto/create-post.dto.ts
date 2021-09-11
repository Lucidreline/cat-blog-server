// dto stands for data transfer object

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  textBody: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty()
  authorId: User;

  @ApiProperty()
  authorUsername: string;
}
