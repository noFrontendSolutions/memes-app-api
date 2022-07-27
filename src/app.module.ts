import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PublicModule } from './public/public.module';
import { PublicService } from './public/public.service';
import { PublicController } from './public/public.controller';

//The ConfigModule is required to get access to the .env file. It's used in prisma.service.ts (using the ConfigService class of the module)...
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PublicModule,
  ],
  controllers: [AppController, UserController, PublicController],
  providers: [AppService, UserService, PublicService],
})
export class AppModule {}
