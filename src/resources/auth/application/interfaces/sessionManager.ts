import { UserIdDataType } from "@user/domain/user.entity"

export type TokenDataType = string;

export interface SessionData{
    userId: UserIdDataType
}

export interface SessionManagerRepository{
    createToken(data: SessionData): Promise<TokenDataType>,
    verifyToken(sesion: TokenDataType): Promise<SessionData | null>,
    tokenBelongsTo(token: TokenDataType, userId: UserIdDataType): Promise<boolean>
}