import {
  IsBoolean,
  IsInstance,
  IsInt,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsString,
} from 'class-validator';

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

export class PostCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  meme_id: number;
}

export class LikeMemeDto {
  @IsNumber()
  is_lover: number;

  @IsNumber()
  is_hater: number;

  @IsNotEmpty()
  user_id: number;

  meme_id: number;

  @IsNumber()
  likes_increment: number;

  @IsNumber()
  dislikes_increment: number;
}
