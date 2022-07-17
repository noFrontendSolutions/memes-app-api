import { Controller, Get, Param, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { resolve } from 'path';

@Controller('public')
export class PublicController {
  constructor(private prisma: PrismaService) {}

  @Get('meme-info')
  async memeInfo() {
    const memeInfo = await this.prisma.meme.findMany({
      orderBy: { created_at: 'asc' },
    });
    return { ...memeInfo };
  }

  @Get('meme-image/:id')
  async memeImage(@Param() param, @Res() res: Response) {
    const memeInfo = await this.prisma.meme.findFirst({
      where: { id: parseInt(param.id) },
    });
    const memeUrl = memeInfo.meme_url;
    res.sendFile(memeUrl, { root: resolve('./') });
  }
}
