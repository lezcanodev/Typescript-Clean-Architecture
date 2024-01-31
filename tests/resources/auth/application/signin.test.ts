import { IncorrectCredentials } from "@auth/application/exceptions";
import Signin from "@auth/application/signin";
import { UserId, UserProps } from "@user/domain/user.entity";
import { fakeSessionManager } from "./interfaces";
import { fakeHashComparator } from "@tests/common/application";
import { fakeUserFinder } from "@tests/user/application";

const fakeUser: UserProps = {
    id: new UserId('any_id'),
    email: 'any_email',
    nick: 'any_nick',
    passwordHash: 'any_hash',
    description: 'any_description'
}

const signinUseCase: Signin = new Signin({
    hashComparator: fakeHashComparator,
    sessionManager: fakeSessionManager,
    userFinder: fakeUserFinder
})

describe('Signin use case', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should call Signin.run with correct params', async () => {
        fakeHashComparator.compare.mockResolvedValue(true);
        fakeUserFinder.findUserByEmail.mockResolvedValue(fakeUser);
        fakeUserFinder.findUserByNick.mockResolvedValue(null);
        fakeSessionManager.createToken.mockResolvedValue('token');

        
        await expect(signinUseCase.run({
            nickOrEmail: 'valid_nickOrEmail',
            password: 'valid_password'
        })).resolves.toBe('token');

        expect(fakeHashComparator.compare).toHaveBeenCalledWith('any_hash', 'valid_password');
        expect(fakeSessionManager.createToken).toHaveBeenCalledWith({
            userId: 'any_id'
        })
    });

    it('should throw an IncorrectCredentials error when the user is not found by nick or email', async () => {
        fakeUserFinder.findUserByEmail.mockResolvedValue(null);
        fakeUserFinder.findUserByNick.mockResolvedValue(null);

        await expect(signinUseCase.run({
            nickOrEmail: 'valid_nickOrEmail',
            password: 'valid_password'
        })).rejects.toThrow(new IncorrectCredentials());

    })

    it('should throw an IncorrectCredentials when the user password is incorrect', async () => {
        fakeHashComparator.compare.mockResolvedValue(false);

        await expect(signinUseCase.run({
            nickOrEmail: 'valid_nickOrEmail',
            password: 'valid_password'
        })).rejects.toThrow(new IncorrectCredentials());
    })

})
