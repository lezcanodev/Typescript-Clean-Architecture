import { PostEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";
import { Repository } from "typeorm";
import { postRepository } from "./postRepository";
import { PostCrudGetAllPostsOutput, PostCrudRepository, getAllPostsOptions } from "@post/application/interfaces/postCRUD.repository";
import Post from "@post/domain/post.entity";


export class PostCRUDPostgres implements PostCrudRepository{

    constructor(private readonly postRepository: Repository<PostEntityPostgres>){}
    
    async save(post: Post): Promise<void> {
        await this.postRepository.save({
            id: post.idValue,
            userId: post.userIdValue,
            description: post.description,
            numberLikes: post.numberLikes,
            createdAt: post.createdAt,
            modifiedAt: post.modifiedAt
        });

    }

    async getAllPosts(options?: getAllPostsOptions): Promise<PostCrudGetAllPostsOutput[]> {

        const posts =   await this.postRepository.find({
            relations: {
                user: options?.joinUser === true,
                images: true
            }
        });    
       
            
        const parsePosts: PostCrudGetAllPostsOutput[] = posts.map( (post): PostCrudGetAllPostsOutput  => {
            return {
                id: post.id,
                user: {
                    id: post.user.id,
                    nick: post.user.nick
                },
                photos: post.images.map((photo) => ({
                    id: Number(photo.id),
                    publicDir: photo.url
                })),
                createdAt: post.createdAt.toLocaleString(),
                description: post.description || '',
                modifiedAt: post.modifiedAt.toLocaleString(),
                numberLikes: post.numberLikes
            }
        } );

        return parsePosts;

    }

}

const postCRUDPostgres = new PostCRUDPostgres(postRepository);
export {postCRUDPostgres};