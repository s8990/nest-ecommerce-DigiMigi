import {
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: string;

  @IsOptional()
  readonly tagList?: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly productCategoryId: string;
}
