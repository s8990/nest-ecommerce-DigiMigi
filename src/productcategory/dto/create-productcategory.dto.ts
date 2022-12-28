import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductcategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
