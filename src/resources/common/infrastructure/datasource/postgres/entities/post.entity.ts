import { PostIdDataType, PostProps } from "@post/domain/post.entity";
import { UserIdDataType } from "@user/domain/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PostImageEntityPostgres } from "./postImage.entity";
import { UserEntityPostgres } from "./user.entity";


@Entity({
    name: 'posts'
})
export class PostEntityPostgres implements Omit<PostProps, 'id' | 'photos'  | 'timestamp' | 'tags'>{

    @Column({
        primary: true,
        type: 'uuid',
    })
    id: PostIdDataType;

    @Column({
        name: 'userid'
    })
    userId: UserIdDataType;

    @Column({
        nullable: true,
        type: 'varchar'
    })
    description: string | null;
    
    @Column({
        name: 'numberlikes'
    })
    numberLikes: number;


    @Column({
        name: 'createdat'
    })
    createdAt: Date;

    @Column({
        name: 'modifiedat'
    })
    modifiedAt: Date;
    
    @OneToMany(() => PostImageEntityPostgres, (postImage) => postImage.post )
    images: PostImageEntityPostgres[];

    @ManyToOne(() => UserEntityPostgres, (user) => user.posts)
    @JoinColumn({
        name: 'userid'
    })
    user: UserEntityPostgres
    //tags: TagEntityPostgres[];
}