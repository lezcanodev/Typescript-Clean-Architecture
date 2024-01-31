
import { PostIdDataType } from "@post/domain/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PostEntityPostgres } from ".";



@Entity({
    name: 'post_images'
})
export class PostImageEntityPostgres{

    @PrimaryColumn()
    id: PostIdDataType;

    @Column({
        name: 'postid',
        type:  'uuid'
    })
    postId: string

    @Column()
    url: string;

    @ManyToOne(() => PostEntityPostgres, (post) => post.images)
    @JoinColumn({ name: 'postid' })
    post: PostEntityPostgres
}   