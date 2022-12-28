import dataSource from 'db/data-source';
import { ProductEntity } from '@/product/entities/product.entity';

export const ProductRepository = dataSource.getRepository(ProductEntity);
