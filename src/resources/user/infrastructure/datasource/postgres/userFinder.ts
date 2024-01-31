import { UserEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";
import { UserFinderRepository } from "@user/application/interfaces";
import { UserId, UserProps } from "@user/domain/user.entity";
import { Repository } from "typeorm";
import { userRepository } from "./userRepository";



export class UserFinderPostgres implements UserFinderRepository{

    public constructor(private readonly userRepository: Repository<UserEntityPostgres>){}
    
    async findUserByNick(nick: string): Promise<UserProps | null> {
        const result = await this.userRepository.findOneBy ({
                nick: nick
        });

        if(result == null) return null;
        
        return {
            id: new UserId(result.id),
            email: result.email,
            nick: result.nick,
            passwordHash: result.passwordHash
        };
    }

    async findUserByEmail(email: string): Promise<UserProps | null> {
        const result = await this.userRepository.findOneBy ({
            email: email
        });

        if(result == null) return null;
        
        return {
            id: new UserId(result.id),
            email: result.email,
            nick: result.nick,
            passwordHash: result.passwordHash
        };
    }
} 

const userFinderPostgres = new UserFinderPostgres(userRepository)

export {
    userFinderPostgres
}