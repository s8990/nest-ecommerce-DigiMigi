import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductcategoryService } from './productcategory.service';
import { CreateProductcategoryDto } from './dto/create-productcategory.dto';
import { UpdateProductcategoryDto } from './dto/update-productcategory.dto';

@Controller('api/product-category')
export class ProductcategoryController {
  constructor(private readonly productcategoryService: ProductcategoryService) {}

  @Post()
  create(@Body() createProductcategoryDto: CreateProductcategoryDto) {
    return this.productcategoryService.create(createProductcategoryDto);
  }

  @Get()
  findAll() {
    return this.productcategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productcategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductcategoryDto: UpdateProductcategoryDto) {
    return this.productcategoryService.update(+id, updateProductcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productcategoryService.remove(+id);
  }
}
