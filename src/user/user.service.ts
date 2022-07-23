//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostMemeDto, PostCommentDto, LikeMemeDto } from './dto';
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
      res.send(memePost);
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
          meme_id: parseInt(postCommentDto.meme_id),
        },
      });
      res.send({ ...details });
    } catch (error) {
      throw error;
    }
  }

  //*************************************************************************************
  //***************************Like Meme************************************************* */#
  //*************************************************************************************

  async likeMeme(param, body: any, res: Response) {
    const updatedStats = await this.prisma.memeStats.upsert({
      where: { id: parseInt(param.id) },
      update: {
        is_lover: parseInt(body.is_lover),
        is_hater: parseInt(body.is_hater),
        user_id: parseInt(body.user_id),
        meme_id: parseInt(param.id),
      },
      create: {
        meme_id: parseInt(param.id),
        is_lover: parseInt(body.is_lover),
        is_hater: parseInt(body.is_hater),
        user_id: parseInt(body.user_id),
      },
    });

    res.send(updatedStats);
  }

  //*************************************************************************************
  //***************************Like Comment*************************************** */#
  //*************************************************************************************

  async likeComment() {}
}
