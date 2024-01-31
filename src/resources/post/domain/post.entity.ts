
import {EntityId,  Timestamp} from "@common/domain/types";
import PostDomainError from "./postDomainError";
import {  UserIdDataType } from "@user/domain/user.entity";
import { FileIdDataType } from "@file/domain/file.entity";



export type PostIdDataType = string;

export class PostId extends EntityId<PostIdDataType>{
    public constructor(id: string){
        super({id});
    }
};

export type PostPhotos = {
    id: FileIdDataType,
    publicDir: string
}

/**
 * Post properties
 */
export interface PostProps{
    id: PostId,
    userId: UserIdDataType,
    photos: PostPhotos[],
    timestamp: Timestamp
    description: string | null,
    numberLikes: number,
}

/**
 * Represents the Post entity
 */
export default class Post{

    /**
     * @param postProps Post properties
     */
    private constructor(private readonly _postProps: PostProps) {}

    get id(): PostId{
        return this._postProps.id;
    }

    get idValue(): PostIdDataType{
        return this._postProps.id?.id;
    }

    get createdAt(): Date{
        return this._postProps.timestamp.createdAt;
    }

    get modifiedAt(): Date{
        return this._postProps.timestamp.modifiedAt;
    }

    get description(): string{
        return this._postProps.description || '';
    }

    get numberLikes(): number{
        return this._postProps.numberLikes;
    }

    get userIdValue(): UserIdDataType{
        return this._postProps.userId
    }

    get photos(): PostPhotos[]{
        return this._postProps.photos
    }

    /**
     * build and return a new Post
     * @param postProps properties to build a new post
     * @returns new Post
     */
    public static build(postProps: PostProps): Post{
     
        if(postProps.photos.length == 0){
            throw new PostDomainError('must have at least 1 photo');
        }

        if(postProps.numberLikes < 0){
            throw new PostDomainError('number of like must be greater than 0');
        }
        
        return new Post(postProps);
    }

}

