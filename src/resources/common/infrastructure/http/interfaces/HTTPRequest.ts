import { FileHttpRequest } from "./file";

export type FileRequestDataType = {[name: string]: FileHttpRequest[]};

export interface HttpRequest<TBody = any, TParams = any, TQuery = any, THeaders = any>{
    body?: TBody,
    params?: TParams,
    query?: TQuery,
    headers?: {[header: string]: string},
    files?: FileRequestDataType
};