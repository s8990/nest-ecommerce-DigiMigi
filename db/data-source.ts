import { DataSource, DataSourceOptions } from 'typeorm';
import { TagEntity } from '@/tag/entities/tag.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { ArticleEntity } from '@/article/entities/article.entity';
import { FollowEntity } from '@/profile/entities/follow.entity';
import { ProductEntity } from '@/product/entities/product.entity';
import { ProductCategoryEntity } from '@/productcategory/entities/productcategory.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nest-digimigi',
  entities: [
    UserEntity,
    ProductCategoryEntity,
    ProductEntity,
    TagEntity,
    ArticleEntity,
    FollowEntity,
  ],
  migrations: ['dist/db/migrations/*.js'],
  //   entities: ['dist/**/*.entity.js']
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
