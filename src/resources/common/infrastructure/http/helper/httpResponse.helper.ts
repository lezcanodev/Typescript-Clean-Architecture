import { HTTPResponse } from "../interfaces";


export function ok(): HTTPResponse<any>{
    return {
        statusCode: 200,
        message: 'Ok'
    }
}


export function created(): HTTPResponse<any>{
    return {
        statusCode: 201,
        message: 'Created'
    }
}

export function unauthorized(): HTTPResponse<any>{
    return {
        statusCode: 401,
        message: 'Unauthorized'
    }
}

export function badRequest(): HTTPResponse<any>{
    return {
        statusCode: 400,
        message: 'Bad Request'
    }
}

export function internalServerError(): HTTPResponse<any>{
    return {
        statusCode: 500,
        message: 'Internal Server Error'
    }
}

export function forbidden(): HTTPResponse<any>{
    return {
        statusCode: 403,
        message: 'Forbidden'
    }
}