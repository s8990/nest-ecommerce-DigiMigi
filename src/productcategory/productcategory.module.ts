import { Module } from '@nestjs/common';
import { ProductcategoryService } from './productcategory.service';
import { ProductcategoryController } from './productcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './entities/productcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductcategoryController],
  providers: [ProductcategoryService],
})
export class ProductcategoryModule {}
