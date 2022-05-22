import { ConnectionOptions, createConnection } from 'typeorm';

const connectionSource:ConnectionOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gostack_gobarber',
  // logging: false,
  // synchronize: false,
  // name: 'default',
  entities: ['src/models/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
};

createConnection(connectionSource);
