export interface BaseFilterPagination {
    pageNo?: number;
    pageSize?: number;
}

export interface PaginationResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
}
