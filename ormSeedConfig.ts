import { dataSourceOptions } from 'db/data-source';

const ormSeedConfig = {
  ...dataSourceOptions,
  migrations: ['src/seeds/*.ts'],
  cli: {
    migrationsDir: 'src.seeds',
  },
};

export default ormSeedConfig;
