import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
//argon2 is used for password hashing
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { resolve } from 'path';

@Injectable()
export class AuthService {
  // although not imported in auth.module, the PrismaService class is available here because it's been exported Globally from prisma.module.ts
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //***********************************************************************
  //************************Login******************************************
  //***********************************************************************
  async login(body: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new ForbiddenException('Error: User does not exist.');
    }

    const isPasswordMatch = await argon.verify(user.password, body.password);
    if (!isPasswordMatch) {
      throw new ForbiddenException('Error: Password does not match.');
    }

    delete user.password;
    return { token: await this.createToken(user.id, user.email), user };
  }

  //*********************************************************************
  //************************Sign Up**************************************
  //*********************************************************************
  async signUp(body: SignUpDto, avatar: Express.Multer.File) {
    const hash = await argon.hash(body.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...body,
          password: hash,
          avatar_url: avatar?.path,
        },
      });
      delete user.password;

      //here comes logic for email verification. Send an email that includes an a-tag with a link: "confirmation/:token".
      //messgae: Click link and login with your email and password
      //token gets not returnd as in below. Send message to client instead.
      return {
        //message: "Please confirm your email"
        token: await this.createToken(user.id, user.email),
        user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'Error: Credentials have already been asigned.',
        );
      } else {
        throw error;
      }
    }
  }

  //*********************************************************************
  //************************Confirm User (not finished)******************
  //*********************************************************************
  async confirmUser(param: any) {
    const secret = await this.config.get('JWT_SECRET');
    const { email, sub } = await this.jwt.verify(param.token, {
      secret: secret,
    });

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    console.log(sub);
    if (!user) {
      throw new ForbiddenException('Error: User does not exist.');
    }
    /*  const updatedUser = await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        confirmed: 1,
      },
    }); */

    //Redirect user to home page
  }

  //*********************************************************************
  //************************Get Avatar**************************************
  //*********************************************************************

  async getAvatar(param, response: Response) {
    const id = parseInt(param.id);

    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    let src = 'public/default-avatar.png';
    if (user.avatar_url) {
      src = user.avatar_url;
    }
    response.sendFile(src, { root: resolve('./') });
  }

  //***********************************************************************
  //************************Helper Funtion*********************************
  //***********************************************************************
  async createToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
