import { PagingData, ResponseStatus } from "./response.class";
import { IApiPagedResponse, IApiResponse } from "./response.interface";
import { ApiPagedResponse, ApiResponse } from "./response.type";


export default class ResponseUtil {
    private readonly defaultStatus: ResponseStatus;
    constructor() {
        this.defaultStatus = {
            code: 200,
            description: 'OK',
        };
    }

    rebuildResponse(data: any, status: ResponseStatus = this.defaultStatus): ApiResponse {
        const response: IApiResponse = {
            status, data,
        };

        return response;
    }

    responsePagedResponse(data: any[], paging?: PagingData, status: ResponseStatus = this.defaultStatus): ApiPagedResponse {
        const response: IApiPagedResponse = {
            status, data, paging,
        };

        return response;
    }
}