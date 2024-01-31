import { EntityId } from "@common/domain/types"
import FileDomainError from "./fileDomainError";


export type FileIdDataType = number;

export class FileId extends EntityId<FileIdDataType>{
    public constructor(id: FileIdDataType){
        super({id});
    }
}

export interface FileProps{
    id: FileId,
    name: string,
    type: string,
    size: number,
    tempDir: string
}


export default class File{

    protected constructor(private readonly params: FileProps){}

    
    get id(): FileId{
        return this.params.id
    }

    get idValue(): FileIdDataType{
        return this.params.id.id
    }

    get name(): string{
        return this.params.name;
    }

    get type(): string{
        return this.params.type;
    }

    get size(): number{
        return this.params.size;
    }

    get tempDir(): string{
        return this.params.tempDir;
    }
    

    public static build(props: FileProps){
        return new File(props)
    }

    public static buildImage(props: FileProps){
        const imagesTypes = ['png', 'jpg', 'jpeg'];

        if(!imagesTypes.includes(props.type)){
            throw new FileDomainError('Invalid image format');
        }

        return new File(props);
    }
}
