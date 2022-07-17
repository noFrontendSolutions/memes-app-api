//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostMemeDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async postMeme(postMemeDto: PostMemeDto, memeFile: Express.Multer.File) {
    console.log(memeFile);

    const memePost = await this.prisma.meme.create({
      data: {
        title: postMemeDto.title,
        user_id: parseInt(postMemeDto.user_id),
        meme_url: memeFile.path,
      },
    });
    return { message: 'Success' };
  }
}
