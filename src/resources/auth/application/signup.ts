import {  HashGenerator } from "@common/application/interfaces";
import { UseCase } from "@common/application/usescases";
import User, { UserIdDataType, UserProps } from "@user/domain/user.entity";
import { UserCRUDRepository, UserExistRepository } from "@user/application/interfaces";
import ApplicationError from "@common/application/applicationError";
import { UserGenerator } from "@user/application/interfaces/userGenerator.repository";
import { EmailAlreadyTaken } from "./exceptions";
import { NickAlreadyTaken } from "./exceptions/nickAlreadyTaken.error";

// Input model to register an user
export interface SignUpDTO{
    nick: string,
    email: string,
    password: string
}

// output model
export type OutputSignUpDTO = Omit<UserProps, 'passwordHash' | 'id'> & {
    id: UserIdDataType
};

// input boundary
export interface SignUpInputBoundary extends UseCase<SignUpDTO, OutputSignUpDTO>{};


/**
 * parameters of the SignUp constructor 
 */
export interface SignUpParams{
    readonly userCRUD: UserCRUDRepository,
    readonly userExist: UserExistRepository,
    readonly hashGenerator : HashGenerator,
    readonly userGenerator: UserGenerator
}


export default class SignUp implements SignUpInputBoundary{
    
    constructor(private readonly params: SignUpParams){}

    /**
     * Responsible for registering  a User
     */
    async run(input: SignUpDTO): Promise<OutputSignUpDTO>{
        try{
            const {email, nick, password} = input;

            const [emailUserExist, nickUserExist] = await Promise.all([
                this.params.userExist.existEmailUser(email),
                this.params.userExist.existNickUser(nick)
            ]);

            if(emailUserExist){
                throw new EmailAlreadyTaken();
            }   

            if(nickUserExist){
                throw new NickAlreadyTaken();
            }   
            
            if(password.length < 6){
                throw new ApplicationError('The password must be at least 6 characters long');
            }

            const [passwordHash, userId] = await Promise.all([
                this.params.hashGenerator.hash(password),
                this.params.userGenerator.generateNextUserId()
            ]);

            const user = User.build({
                id: userId,
                email,
                nick,
                passwordHash
            });

            await this.params.userCRUD.save(user);


            return {
                id: user.idValue,
                email: user.email,
                nick: user.nick,
                description: ''
            };

        }catch(e: unknown){
            throw e;
        }

    }
}