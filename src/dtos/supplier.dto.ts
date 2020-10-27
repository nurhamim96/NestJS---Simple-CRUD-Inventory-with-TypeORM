import SupplierEntity from "src/models/supplier.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.interface";


export class SupplierDTO {
    readonly id: string;
    readonly supplier: string;
}

export class SupplierResponse implements IApiResponse {
    status: ResponseStatus;
    data: SupplierDTO;
}

export class SupplierResponses {
    status?: ResponseStatus;
    data: SupplierEntity | SupplierEntity[];
    paging?: PagingData;
}

export class SupplierQueryDTO {
    term?: string;
    order?: 'supplier';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class SupplierQueryResult {
    result: SupplierEntity[] | SupplierEntity;
    totalRows: number;
}