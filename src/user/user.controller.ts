import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { parse } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PostCommentDto, PostMemeDto, LikeMemeDto } from './dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //*************************************************************************************
  //***************************POST MEME*************************************** */#
  //*************************************************************************************

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('meme', {
      storage: diskStorage({
        destination: './public/memes',
        filename: createUniqueFilename,
      }),
      fileFilter: validateFileFormat,
    }),
  )
  @Post('post-meme')
  postMeme(
    @Body() postMemeDto: PostMemeDto,
    @UploadedFile() memeFile: Express.Multer.File,
    @Res() res: Response,
  ) {
    this.userService.postMeme(postMemeDto, memeFile, res);
  }
  //*************************************************************************************
  //***************************POST Comment*************************************** */#
  //*************************************************************************************

  @UseGuards(AuthGuard('jwt'))
  @Post('post-comment')
  postComment(@Body() postCommentDto: PostCommentDto, @Res() res: Response) {
    this.userService.postComment(postCommentDto, res);
  }
  //*************************************************************************************
  //***************************SET PREFERENCES******************************************
  //*************************************************************************************

  @UseGuards(AuthGuard('jwt'))
  @Post('set-preferences')
  setPreferences(@Body() body: any, @Res() res: Response) {
    this.userService.setPreferences(body, res);
  }

  //*************************************************************************************
  //***************************RESET PREFERENCES******************************************
  //*************************************************************************************

  @UseGuards(AuthGuard('jwt'))
  @Put('set-preferences/:id')
  resetPreferences(@Param() param, @Body() body: any, @Res() res: Response) {
    this.userService.resetPreferences(param, body, res);
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
