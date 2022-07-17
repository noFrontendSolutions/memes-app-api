import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { resolve } from 'path';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async memeInfo() {
    const memeInfo = await this.prisma.meme.findMany({
      orderBy: { created_at: 'asc' },
    });
    return { ...memeInfo };
  }

  async memeImage(param, res: Response) {
    const memeInfo = await this.prisma.meme.findFirst({
      where: { id: parseInt(param.id) },
    });
    const memeUrl = memeInfo.meme_url;
    res.sendFile(memeUrl, { root: resolve('./') });
  }
}
