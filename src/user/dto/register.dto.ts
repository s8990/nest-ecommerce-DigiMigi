import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly bio: string;

  readonly image: string;
}
