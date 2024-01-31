/*import "dotenv/config";
import { entityFilesDir, migrationsFilesDir } from '../../../../../../src/resources/common/infrastructure/datasource/postgres';
import { DataSource } from 'typeorm';


const PostgressDataSourceTest = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    entities: [entityFilesDir],
    migrations: [migrationsFilesDir]
})

export default PostgressDataSourceTest;*/