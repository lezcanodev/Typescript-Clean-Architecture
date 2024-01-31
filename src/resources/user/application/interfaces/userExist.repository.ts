

export interface UserExistRepository{
    existEmailUser(email: string): Promise<boolean>;
    existNickUser(nick: string): Promise<boolean>;
}