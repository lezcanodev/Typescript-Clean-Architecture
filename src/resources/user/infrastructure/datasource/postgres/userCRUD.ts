import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { UserEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";
import { UserCRUDRepository } from "@user/application/interfaces";
import User from "@user/domain/user.entity";
import { userRepository } from "./userRepository";
import { Repository } from "typeorm";



export class UserCRUDPostgres implements UserCRUDRepository{

    constructor(private readonly userRepository: Repository<UserEntityPostgres>){}

    async save(user: User): Promise<void>{
        await this.userRepository.save({
            id: user.idValue,
            email: user.email,
            nick: user.nick,
            passwordHash: user.passwordHash, 
            description: user.description
        });
    }
}

const userCRUDPostgres = new UserCRUDPostgres(userRepository);
export {userCRUDPostgres};