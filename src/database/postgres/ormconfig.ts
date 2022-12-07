import { TagEntity } from '@/tag/entities/tag.entity';
import { TypeOrmModuleOptions  } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions  = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'nest-digimigi',
  // entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
  entities: [TagEntity],
  synchronize: true,
};

export default config;
