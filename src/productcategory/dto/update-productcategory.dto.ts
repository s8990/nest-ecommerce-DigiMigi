import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductcategoryDto } from '@/productcategory/dto/create-productcategory.dto';

export class UpdateProductcategoryDto extends PartialType(
  CreateProductcategoryDto,
) {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
