import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Required npm packages for validation: 'class-validator' & 'class-transformer'
// Put this line 'app.useGlobalPipes(new ValidationPipe({whiteList: true}))' in main.ts to make validation work
//The 'whiteList' option is used to only register fields that have been exolicitly specified in the dtos.

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  avatar: Buffer;

  @IsOptional()
  avatar_url: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
