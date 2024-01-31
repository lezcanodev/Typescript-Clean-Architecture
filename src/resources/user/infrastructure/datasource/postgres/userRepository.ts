import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { UserEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";



export const userRepository = PostgressDataSource.getRepository(UserEntityPostgres);