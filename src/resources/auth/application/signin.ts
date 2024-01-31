import { HashComparator } from "@common/application/interfaces";
import { UseCase } from "@common/application/usescases";
import { UserFinderRepository } from "@user/application/interfaces";
import User from "@user/domain/user.entity";
import { IncorrectCredentials } from "./exceptions";
import { SessionManagerRepository, TokenDataType } from "./interfaces";

// Input model to login
export interface SigninDTO{
    nickOrEmail: string,
    password: string
}

// output model
export type OutputSigninDTO = TokenDataType;

/**
 * parameters of the Signin constructor 
 */
export interface SigninParams{
    readonly userFinder: UserFinderRepository,
    readonly hashComparator: HashComparator,
    readonly sessionManager: SessionManagerRepository
}

export interface SigninInputBoundary extends UseCase<SigninDTO, OutputSigninDTO>{};

export default class Signin implements SigninInputBoundary{
    
    constructor(private readonly params: SigninParams){}

    async run(input: SigninDTO): Promise<OutputSigninDTO> {
        try{
            const {nickOrEmail, password} = input;

            const [userByNick, userByEmail] = await Promise.all([
                this.params.userFinder.findUserByNick(nickOrEmail),
                this.params.userFinder.findUserByEmail(nickOrEmail)
            ]);

            const userProps = userByEmail || userByNick;

            if(userProps === null){
                throw new IncorrectCredentials();
            }

            const user = User.build(userProps);

            const matchPassword = await this.params.hashComparator.compare(user.passwordHash, password);

            if(!matchPassword){
                throw new IncorrectCredentials();
            }


            const token = await this.params.sessionManager.createToken({
                userId: user.idValue
            });

            return token;
        }catch(error){
            throw error;
        }
    }
}