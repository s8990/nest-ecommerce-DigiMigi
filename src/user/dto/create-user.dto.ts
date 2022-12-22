import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly mobile: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly bio: string;
  
  @IsOptional()
  @IsString()
  readonly image: string;
}
