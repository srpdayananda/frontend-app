export interface IPagination {
    nextPage: number | null;
    page: number;
    perPage: number;
    previousPage: number | null;
    total: number
}