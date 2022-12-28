import { ProductEntity } from '@/product/entities/product.entity';

export type ProductType = Omit<ProductEntity, 'updateTimestamp'>;
