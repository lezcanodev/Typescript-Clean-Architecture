import { HashComparator, HashGenerator } from "@common/application/interfaces";
import bcrypt from 'bcrypt';


interface BcryptParams{
    readonly salt: string | number
}

export class BcryptHash implements HashGenerator, HashComparator{
    
    public constructor(private readonly params: BcryptParams){}

    async hash(input: string): Promise<string> {
        try{
            const hash = await bcrypt.hash(input, this.params.salt);
            return hash
        }catch(error){
            throw error;
        }
    }

    
    async compare(hashInput: string, rawString: string): Promise<boolean> {
        try{
            return await bcrypt.compare(rawString, hashInput);
        }catch(error){
            throw error;
        }
    }
}