import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  
  @IsOptional()
  readonly tagList?: string[];
  
  @IsNotEmpty()
  @IsNumber()
  readonly productCategoryId: string;
}
