import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  textBody: string;

  @ApiProperty()
  likeCounter: number;

  @ApiProperty({ required: false })
  imageUrl?: string;
}
