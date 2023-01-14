import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
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
  // @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {message: "phone mustbe a valid phone number"})
  readonly mobile: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly bio: string;
  
  @IsOptional()
  @IsString()
  readonly image: string;
}
