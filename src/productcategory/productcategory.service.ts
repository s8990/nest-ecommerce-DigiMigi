import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoryEntity } from '@/productcategory/entities/productcategory.entity';
import { CreateProductcategoryDto } from '@/productcategory/dto/create-productcategory.dto';
import { UpdateProductcategoryDto } from '@/productcategory/dto/update-productcategory.dto';

@Injectable()
export class ProductcategoryService {
  @InjectRepository(ProductCategoryEntity)
  private readonly productCategoryRepository: Repository<ProductCategoryEntity>;

  create(createProductcategoryDto: CreateProductcategoryDto) {
    return this.productCategoryRepository.save(createProductcategoryDto);
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  findOne(id: number) {
    return this.productCategoryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProductcategoryDto: UpdateProductcategoryDto) {
    return `This action updates a #${id} productcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productcategory`;
  }
}
