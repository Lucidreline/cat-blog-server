// dto stands for data transfer object

import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  textBody: string;

  @ApiProperty({ required: false })
  imageUrl?: string;
}
