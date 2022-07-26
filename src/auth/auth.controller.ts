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
import { parse } from 'path';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //*************************************************************************************
  //*****************************LOGIN***************************************************
  //*************************************************************************************

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  //*************************************************************************************
  //*****************************Email Confirmation***************************************
  //*************************************************************************************

  @Get('confirmation/:token')
  confirmUser(@Param() param: any) {
    return this.authService.confirmUser(param);
  }

  //*************************************************************************************
  //*****************************SIGN UP*************************************************
  //*************************************************************************************

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
  signUp(@Body() body: SignUpDto, @UploadedFile() avatar: Express.Multer.File) {
    //console.log(avatar);
    return this.authService.signUp(body, avatar);
  }

  //*************************************************************************************
  //*****************************GET AVATAR IMAGE****************************************
  //*************************************************************************************

  @Get('avatars/:id')
  async getAvatar(@Param() param, @Res() response: Response) {
    return this.authService.getAvatar(param, response);
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
  if (file.size >= 500000) {
    req.fileValidationError = 'Error: File size too big.';
    return cb(null, false, new Error('Error: File size too big.'));
  }
  cb(null, true);
}
