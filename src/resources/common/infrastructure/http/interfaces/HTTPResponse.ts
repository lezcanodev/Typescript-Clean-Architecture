export interface HTTPResponse<TBody=any>{
    body?: TBody,
    headers?: {[header: string]: string},
    statusCode: number,
    message: string
}