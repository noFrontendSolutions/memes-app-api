import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { parse, resolve } from 'path';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('sign-up')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: createUniqueFilename,
      }),
      fileFilter: validateFileFormat,
    }),
  )
  signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    //console.log(avatar);
    return this.authService.signUp(signUpDto, avatar);
  }

  @Get('avatars/:id')
  async sendAvatar(@Param() params, @Res() response: Response) {
    const id = parseInt(params.id);
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    response.sendFile(user.avatar_url, { root: resolve('./') });
  }
}

//*************************************************************************************
//*****************************Helper Function*****************************************
//*************************************************************************************
function createUniqueFilename(req: any, file: Express.Multer.File, cb: any) {
  const uniqueFileName =
    parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  const fileExtension = parse(file.originalname).ext;
  const newFileName = uniqueFileName + fileExtension;
  cb(null, newFileName);
}

function validateFileFormat(req: any, file: Express.Multer.File, cb: any) {
  const fileExtension = parse(file.originalname).ext;
  const allowedExtensions = /jpg|jpeg|png|gif|svg/;

  if (!allowedExtensions.test(fileExtension)) {
    req.fileValidationError = 'Error: Wrong File extension.';
    return cb(null, false, new Error('Error: Wrong File extension.'));
  }
  if (file.size >= 100000) {
    req.fileValidationError = 'Error: File size too big.';
    return cb(null, false, new Error('Error: File size too big.'));
  }
  cb(null, true);
}
