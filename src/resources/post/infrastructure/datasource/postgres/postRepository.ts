import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { PostEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";




export const postRepository = PostgressDataSource.getRepository(PostEntityPostgres);
