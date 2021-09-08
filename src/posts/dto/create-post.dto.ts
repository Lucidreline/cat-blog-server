// dto stands for data transfer object

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsUrl } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  textBody: string;

  @ApiProperty({ required: false })
  imageUrl?: string;
}
