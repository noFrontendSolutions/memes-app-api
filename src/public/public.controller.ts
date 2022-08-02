import { Controller, Get, Param, Res } from '@nestjs/common';
import { PublicService } from './public.service';
import { Response } from 'express';

@Controller('api/public')
export class PublicController {
  constructor(private publicService: PublicService) {}

  @Get('meme-info')
  async memeInfo() {
    return this.publicService.memeInfo();
  }

  @Get('test')
  async test() {
    return 'Hello World';
  }

  @Get('meme-image/:id')
  async memeImage(@Param() param, @Res() res: Response) {
    return this.publicService.memeImage(param, res);
  }

  @Get('meme-stats/:id')
  async memeStats(@Param() param, @Res() res: Response) {
    return this.publicService.memeStats(param, res);
  }
}
