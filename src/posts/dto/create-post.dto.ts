// dto stands for data transfer object

import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsUrl } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsAlphanumeric()
  title: string;

  @ApiProperty()
  textBody: string;

  @IsUrl()
  @ApiProperty({ required: false })
  imageUrl?: string;
}
