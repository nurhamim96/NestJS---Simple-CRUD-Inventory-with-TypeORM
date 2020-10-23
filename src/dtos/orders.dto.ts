import OrdersEntity from "src/models/orders.entity";
import ProductsEntity from "src/models/product.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.interface";

export class OrdersDTO {
    readonly id: string;
    readonly title: string;
    readonly first: string;
    readonly middle: string;
    readonly last: string;
    readonly productId: ProductsEntity;
    readonly numberShipped: number;
    readonly orderDate: Date;
}

export class OrdersResponse implements IApiResponse {
    status: ResponseStatus;
    data: OrdersDTO;
}

export class OrdersResponses {
    status?: ResponseStatus;
    data: OrdersEntity | OrdersEntity[];
    paging?: PagingData;
}

export class OrdersQueryDTO {
    term?: string;
    order?: 'orderDate';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class OrdersQUeryResult {
    result: OrdersEntity[] | OrdersEntity;
    totalRows: number;
}