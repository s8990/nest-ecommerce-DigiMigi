import { Module } from '@nestjs/common';
import { ProductService } from '@/product/services/product.service';
import { ProductController } from '@/product/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { FollowEntity } from '@/profile/entities/follow.entity';
import { ProductCategoryEntity } from '@/productcategory/entities/productcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategoryEntity,
      ProductEntity,
      UserEntity,
      FollowEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
