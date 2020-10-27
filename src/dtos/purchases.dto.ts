import ProductsEntity from "src/models/product.entity";
import PurchasesEntity from "src/models/purchases.entity";
import SupplierEntity from "src/models/supplier.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.interface";

export class PurchasesDTO {
    readonly id: string;
    readonly supplierId: SupplierEntity;
    readonly productId: ProductsEntity;
    readonly numberReceived: number;
    readonly purchaseDate: Date;
}

export class PurchasesResponse implements IApiResponse {
    status: ResponseStatus;
    data: PurchasesDTO;
}

export class PurchasesResponses {
    status?: ResponseStatus;
    data: PurchasesEntity | PurchasesEntity[];
    paging?: PagingData;
}

export class PurchasesQueryDTO {
    term?: string;
    order?: 'purchaseDate';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class PurchasesQueryResult {
    result: PurchasesEntity[] | PurchasesEntity;
    totalRows: number;
}