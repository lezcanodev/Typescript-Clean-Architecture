import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { PostImageEntityPostgres } from "@common/infrastructure/datasource/postgres/entities/postImage.entity";




export const postImageRepository = PostgressDataSource.getRepository(PostImageEntityPostgres);
