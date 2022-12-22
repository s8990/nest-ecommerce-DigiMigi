import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name: string;
  
  @IsOptional()
  @IsString()
  readonly email: string;
  
  @IsOptional()
  @IsString()
  readonly mobile: string;
  
  @IsOptional()
  @IsString()
  readonly bio: string;
  
  @IsOptional()
  @IsString()
  readonly image: string;
}
