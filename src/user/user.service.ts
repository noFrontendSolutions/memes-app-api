//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostMemeDto, PostCommentDto } from './dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //*************************************************************************************
  //***************************POST MEME*************************************** */#
  //*************************************************************************************

  async postMeme(
    postMemeDto: PostMemeDto,
    memeFile: Express.Multer.File,
    res: Response,
  ) {
    try {
      const memePost = await this.prisma.meme.create({
        data: {
          title: postMemeDto.title,
          user_id: parseInt(postMemeDto.user_id),
          user_name: postMemeDto.user_name,
          meme_url: memeFile.path,
        },
      });
      res.send({ ...memePost });
    } catch (error) {
      throw error;
    }
  }

  //*************************************************************************************
  //***************************POST Comment*************************************** */#
  //*************************************************************************************

  async postComment(postCommentDto: PostCommentDto, res: Response) {
    try {
      const details = await this.prisma.comment.create({
        data: {
          content: postCommentDto.content,
          user_id: parseInt(postCommentDto.user_id),
          user_name: postCommentDto.user_name,
        },
      });
      res.send({ ...details });
    } catch (error) {
      throw error;
    }
  }
}
