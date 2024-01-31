import { SessionData, SessionManagerRepository } from "@auth/application/interfaces";
import jwt from 'jsonwebtoken';


export default class JWTSessionManager implements SessionManagerRepository{
    private readonly PRIVATE_KEY = process.env.JWT_SECRET_KEY!;

    async createToken(data: SessionData): Promise<string> {
        return jwt.sign({
             userId: data.userId,
             iat: Math.floor(Date.now() / 1000) - 30 
            }, this.PRIVATE_KEY);
    }

    async verifyToken(token: string): Promise<SessionData | null> {
       try{
            return jwt.verify(token, this.PRIVATE_KEY) as SessionData
        }catch(error){
            return null;
       }
    }

    async tokenBelongsTo(token: string, userId: string): Promise<boolean> {
        const sessionData = await this.verifyToken(token);
        if(sessionData === null) return false;
        return sessionData.userId === userId;
    }

}

export const jwtSessionManeger = new JWTSessionManager();