import { UserGenerator } from "@user/application/interfaces/userGenerator.repository";
import { UserId } from "@user/domain/user.entity";
import {v4 as uuidV4} from 'uuid';

export class UserGeneratorPosgres implements UserGenerator{

    async generateNextUserId(): Promise<UserId> {
        return new UserId(uuidV4());
    }

}

const userGeneratorPosgres = new UserGeneratorPosgres();
export {userGeneratorPosgres}