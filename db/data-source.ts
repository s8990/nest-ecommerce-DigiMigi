import { DataSource, DataSourceOptions } from 'typeorm';
import { TagEntity } from '@/tag/entities/tag.entity';
import { UserEntity } from '@/user/entities/user.entity';
import { ArticleEntity } from '@/article/entities/article.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nest-digimigi',
  entities: [TagEntity, UserEntity, ArticleEntity],
  migrations: ['dist/db/migrations/*.js'],
  //   entities: ['dist/**/*.entity.js']
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
