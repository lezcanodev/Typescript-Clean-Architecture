
export interface HashGenerator{
    hash(input: string): Promise<string>,
}

export interface HashComparator{
    compare(hashInput: string, rawString: string): Promise<boolean>
}