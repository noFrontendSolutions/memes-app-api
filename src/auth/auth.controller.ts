import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('sign-up')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './files',
        filename: createUniqueFilename,
      }),
    }),
  )
  signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpg|jpeg|png|gif/,
        })
        .addMaxSizeValidator({
          maxSize: 100000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
  ) {
    console.log(avatar);

    return this.authService.signUp(signUpDto, avatar);
  }
}

//*************************************************************************************
//*****************************Helper Function*****************************************

function createUniqueFilename(req: any, file: Express.Multer.File, cb: any) {
  const uniqueFileName =
    parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  const fileExtension = parse(file.originalname).ext;
  const newFileName = uniqueFileName + fileExtension;
  cb(null, newFileName);
}
