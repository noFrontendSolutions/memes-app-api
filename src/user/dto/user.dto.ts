import { IsNotEmpty, IsString } from 'class-validator';

export class PostMemeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  user_name: string;
}
