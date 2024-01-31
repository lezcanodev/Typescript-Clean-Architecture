import { EmailAlreadyTaken } from "@auth/application/exceptions";
import { NickAlreadyTaken } from "@auth/application/exceptions/nickAlreadyTaken.error";
import SignUp from "@auth/application/signup";
import { fakeHashGenerator } from "@tests/common/application";
import { fakeUserCRUD, fakeUserExist, fakeUserGenerator } from "@tests/user/application";
import { UserId } from "@user/domain/user.entity";



const signUpUseCase: SignUp = new SignUp({
    hashGenerator: fakeHashGenerator,
    userCRUD: fakeUserCRUD,
    userExist: fakeUserExist,
    userGenerator: fakeUserGenerator,
});

const newFakeUserData = {
    email: 'valid_email',
    nick: 'valid_nick',
    password: 'valid_password'
};

describe('Signup use case', () => {
    
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should call Signup.run with correct params', async () => {
        
        fakeUserGenerator.generateNextUserId.mockResolvedValue(new UserId('id'))
        
        await expect(signUpUseCase.run(newFakeUserData)).resolves.toStrictEqual({
            id: 'id',
            email: 'valid_email',
            nick: 'valid_nick',
            description: ''
        });

        expect(fakeHashGenerator.hash).toHaveBeenCalledWith(newFakeUserData.password);

    });

    it('should throw an EmailAlreadyTaken exception because the email already exist', async () => {
        fakeUserExist.existEmailUser.mockResolvedValue(true)
        fakeUserExist.existNickUser.mockResolvedValue(false)

        await expect(signUpUseCase.run(newFakeUserData))
              .rejects.toThrow(new EmailAlreadyTaken())

    });

    it('should throw an NickAlreadyTaken exception because the nick already exist', async () => {
        fakeUserExist.existEmailUser.mockResolvedValue(false)
        fakeUserExist.existNickUser.mockResolvedValue(true)
        
        await expect(signUpUseCase.run(newFakeUserData))
              .rejects.toThrow(new NickAlreadyTaken());
    });

})