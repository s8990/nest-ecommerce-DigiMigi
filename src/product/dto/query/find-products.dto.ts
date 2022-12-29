import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductsDTO {
  @IsOptional()
  @IsString()
  readonly tag?: string;

  @IsOptional()
  @IsString()
  readonly productCategoryId?: string;

  @IsOptional()
  @IsString()
  readonly limit?: string;

  @IsOptional()
  @IsString()
  readonly offset?: string;
}
