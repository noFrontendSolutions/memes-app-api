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
    body: PostMemeDto,
    memeFile: Express.Multer.File,
    res: Response,
  ) {
    try {
      const memePost = await this.prisma.meme.create({
        data: {
          title: body.title,
          user_id: parseInt(body.user_id),
          user_name: body.user_name,
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

  async postComment(body: PostCommentDto, res: Response) {
    try {
      const details = await this.prisma.comment.create({
        data: {
          content: body.content,
          user_id: parseInt(body.user_id),
          user_name: body.user_name,
          meme_id: parseInt(body.meme_id),
        },
      });
      res.send({ ...details });
    } catch (error) {
      throw error;
    }
  }
  //*************************************************************************************
  //***************************SET PREFERENCES*****************************************/#
  //*************************************************************************************
  async setPreferences(body: any, res: Response) {
    const updatedStats = await this.prisma.memeStats.create({
      data: {
        meme_id: parseInt(body.meme_id),
        is_lover: parseInt(body.is_lover),
        is_hater: parseInt(body.is_hater),
        user_id: parseInt(body.user_id),
      },
    });
    const updatedMeme = await this.prisma.meme.update({
      where: { id: parseInt(body.meme_id) },
      data: {
        likes: { increment: parseInt(body.likes_increment) },
        dislikes: { increment: parseInt(body.dislikes_increment) },
      },
    });

    res.send({ memeInfo: updatedMeme, memeStats: updatedStats });
  }

  //*************************************************************************************
  //***************************RESET PREFERENCES*****************************************/#
  //*************************************************************************************

  async resetPreferences(param, body: any, res: Response) {
    const updatedStats = await this.prisma.memeStats.update({
      where: { id: parseInt(param.id) },
      data: {
        is_lover: parseInt(body.is_lover),
        is_hater: parseInt(body.is_hater),
      },
    });
    const updatedMeme = await this.prisma.meme.update({
      where: { id: parseInt(body.meme_id) },
      data: {
        likes: { increment: parseInt(body.likes_increment) },
        dislikes: { increment: parseInt(body.dislikes_increment) },
      },
    });

    res.send({ memeInfo: updatedMeme, memeStats: updatedStats });
  }
  //*************************************************************************************
  //***************************Like Comment*************************************** */#
  //*************************************************************************************

  async likeComment() {}
}
