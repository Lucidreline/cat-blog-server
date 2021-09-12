import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class UpdatePostDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  textBody: string;

  @ApiProperty()
  usersLiked: User[];

  @ApiProperty({ required: false })
  imageUrl?: string;
}
