import { Controller, Get, Param, Res } from '@nestjs/common';
import { PublicService } from './public.service';
import { Response } from 'express';

@Controller('public')
export class PublicController {
  constructor(private publicService: PublicService) {}

  @Get('meme-info')
  async memeInfo() {
    return this.publicService.memeInfo();
  }

  @Get('meme-image/:id')
  async memeImage(@Param() param, @Res() res: Response) {
    return this.publicService.memeImage(param, res);
  }
}
