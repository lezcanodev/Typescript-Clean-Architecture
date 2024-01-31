import BaseController from "@common/infrastructure/http/controllers/base.controller";
import { badRequest, internalServerError, ok } from "@common/infrastructure/http/helper";
import { ErrorValidator, HttpRequest, HTTPResponse } from "@common/infrastructure/http/interfaces";


const fakeValidatorRequest = {
    validate: jest.fn<Promise<ErrorValidator>, [HttpRequest]>()
}

class FakeController extends BaseController{
    constructor(){
        super({
            validatorRequest: fakeValidatorRequest
        })
    }
    
    protected async execute(httpRequest: HttpRequest<any, any, any, any>): Promise<HTTPResponse<any>> {
        const response = ok();
        return response;
    }
}

const fakeController = new FakeController();

describe('Base controller', () => {
    beforeEach(jest.clearAllMocks);

    it('should call Validate with correct request', async () => {
        const fakeHttpRequest: HttpRequest<any, any, any, any> = {
            body: {'any_field': 'any_value'}
        } 

        fakeValidatorRequest.validate.mockResolvedValue({
            errors: []
        })

        await fakeController.handle(fakeHttpRequest);

        expect(fakeValidatorRequest.validate).toHaveBeenCalledWith(fakeHttpRequest);
        await expect(fakeValidatorRequest.validate(fakeHttpRequest)).resolves.toStrictEqual({
            errors: []
        });

    })

    it('should return 200 OK', async () => {
        fakeValidatorRequest.validate.mockResolvedValue({
            errors: []
        })

        await expect(fakeController.handle({})).resolves.toStrictEqual(ok());
    })

    it('should return 400 Bad Request', async () => {
        const fakeValidRequestError: ErrorValidator = {
            errors: [{"any_field": "any_error_message"}]
        };
        fakeValidatorRequest.validate.mockResolvedValue(fakeValidRequestError)

        const response = badRequest();
        response.body = fakeValidRequestError;

        await expect(fakeController.handle({})).resolves.toStrictEqual(response);
    });

    it('should return 500 internal server error', async () => {

        fakeValidatorRequest.validate.mockImplementation(() => {
            throw new Error('any unkown error');
        })
        
        const response = internalServerError();

        await expect(fakeController.handle({})).resolves.toStrictEqual(response);
    });

})