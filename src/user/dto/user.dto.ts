import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostMemeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  user_id: number;
}
