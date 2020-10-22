import ProductsEntity from "src/models/product.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.interface";


export class ProductsDTO {
    
    readonly id: string;
    readonly productName: string;
    readonly partNumber: string;
    readonly productLabel: string;
    readonly startingInventory: number;
    readonly inventoryReceive: number;
    readonly inventoryShipped: number;
    readonly inventoryOnHand: number;
    readonly minimumRequired: number;

}

export class ProductsResponse implements IApiResponse {
    status: ResponseStatus;
    data: ProductsDTO;
}

export class ProductsResponses {
    status?: ResponseStatus;
    data: ProductsEntity | ProductsEntity[];
    paging?: PagingData;
}

export class ProductsQueryDTO {
    term?: string;
    order?: 'productName';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class ProductsQueryResult {
    result: ProductsEntity[] | ProductsEntity;
    totalRows: number;
}