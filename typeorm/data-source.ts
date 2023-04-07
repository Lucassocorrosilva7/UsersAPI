import * as dotenv from 'dotenv' 
import {DataSource} from 'typeorm';
import { Migrate1672191057117 } from './migrations/1672191057117-Migrate';

dotenv.config()

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: [Migrate1672191057117]
});

export default dataSource;