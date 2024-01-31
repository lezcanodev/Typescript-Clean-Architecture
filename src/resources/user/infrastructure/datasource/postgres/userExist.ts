import PostgressDataSource from "@common/infrastructure/datasource/postgres";
import { UserEntityPostgres } from "@common/infrastructure/datasource/postgres/entities";
import { UserExistRepository } from "@user/application/interfaces";
import { Repository } from "typeorm";
import { userRepository } from "./userRepository";



export class UserExistPostgres implements UserExistRepository{
    

    constructor(private readonly userRepository: Repository<UserEntityPostgres>){}

    async existNickUser(nick: string): Promise<boolean> {
        return await this.userRepository.exist({
            where: {
                nick: nick
            }
        });
    }

    async existEmailUser(email: string): Promise<boolean> {
        return await this.userRepository.exist({
            where: {
                email: email
            }
        });
    }
}

const userExistPostgres = new UserExistPostgres(userRepository);
export {
    userExistPostgres
}