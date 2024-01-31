import path from 'path';
import { DataSource } from 'typeorm';


export const entitiesDir = path.join(__dirname, 'entities');
export const migrationsDir = path.join(__dirname, 'migrations');
export const entityFilesDir = path.join(entitiesDir,  '*.entity.{ts, js}');
export const migrationsFilesDir = path.join(migrationsDir, '*.{ts, js}');

const PostgressDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [entityFilesDir],
    migrations: [migrationsFilesDir]
})

export default PostgressDataSource;