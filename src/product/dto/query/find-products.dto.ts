import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductsDTO {
  @IsOptional()
  @IsString()
  readonly tag?: string;

  @IsOptional()
  @IsString()
  readonly productCategoryId?: string;

  @IsOptional()
  @IsString()
  readonly minPrice?: string;

  @IsOptional()
  @IsString()
  readonly maxPrice?: string;

  @IsOptional()
  @IsBoolean()
  readonly favorited?: boolean;

  @IsOptional()
  @IsNumber()
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  readonly offset?: number;
}
