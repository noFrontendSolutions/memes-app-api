//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostMemeDto } from './dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
      res.send({ message: `Meme '${postMemeDto.title}' Uploaded Success` });
    } catch (error) {
      throw error;
    }
  }
}
