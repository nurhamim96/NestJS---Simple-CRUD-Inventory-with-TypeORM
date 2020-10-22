
export class ResponseStatus {
    code: number;
    description: string;
}

export class PagingData {
    page: number;
    totalPages: number;
    totalRows: number;
    rowsPerPage: number;
}