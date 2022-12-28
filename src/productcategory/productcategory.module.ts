import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from '@/productcategory/entities/productcategory.entity';
import { ProductcategoryService } from '@/productcategory/productcategory.service';
import { ProductcategoryController } from '@/productcategory/productcategory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductcategoryController],
  providers: [ProductcategoryService],
})
export class ProductcategoryModule {}
