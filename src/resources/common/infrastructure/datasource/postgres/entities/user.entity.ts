import { UserId, UserIdDataType, UserProps } from "@user/domain/user.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PostEntityPostgres } from "./post.entity";


@Entity({
    name: 'users'
})
export class UserEntityPostgres implements Omit<UserProps, 'id'>{

    @Column({
        primary: true,
        type: 'uuid',
    })
    id: UserIdDataType;

    @Column()
    email: string;
    
    @Column()
    nick: string;
    
    @Column()
    description?: string;
    
    @Column({
        name: 'passwordhash'
    })
    passwordHash: string;

    
    @OneToMany(() => PostEntityPostgres, (posts) => posts.user)
    posts: PostEntityPostgres[];

}