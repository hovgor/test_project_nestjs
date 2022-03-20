import { ConnectionOptions } from "typeorm";

const options:ConnectionOptions  = {
    host: '127.0.0.1',
    type: 'postgres',
    port: 5432,
    username:"admin",
    password:"admin",
    database:"test_nest_project",
    entities: [
      'dist/src/**/*.entity.js',
    ],
    migrations: [
      'dist/database/migrations/*.js',
    ],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    synchronize: true,
  };
  export default options;