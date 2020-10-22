import { PagingData, ResponseStatus } from "./response.class";
import { IApiPagedResponse, IApiResponse } from "./response.interface";


export class ApiResponse implements IApiResponse {
    status: ResponseStatus;
    data: any;
}

export class ApiExceptionResponse {
    status: ResponseStatus;
}

export class ApiPagedResponse implements IApiPagedResponse {
    status: ResponseStatus;
    data: any[];
    paging?: PagingData;
}